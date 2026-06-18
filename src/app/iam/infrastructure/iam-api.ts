import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs';

import {BaseApi} from '../../shared/interface/base-api';
import {environment} from '../../../environments/environment';
import {AuthSessionEntity} from '../domain/model/auth-session-entity';
import {AuthResponseResource, LoginRequest, RegisterRequest} from './iam-resources';
import {IamAssembler} from './iam-assembler';

@Injectable({
  providedIn: 'root',
})
export class IamApi extends BaseApi {
  private readonly endpointUrl = `${environment.apiBaseUrl}${environment.authEndpointPath}`;

  constructor(private http: HttpClient) {
    super();
  }

  login(body: LoginRequest): Observable<AuthSessionEntity> {
    return this.http.post<AuthResponseResource>(`${this.endpointUrl}/login`, body).pipe(
      map(response => IamAssembler.toAuthSessionFromResponse(response)),
      catchError(this.handleError('Failed to sign in'))
    );
  }

  register(body: RegisterRequest): Observable<AuthSessionEntity> {
    return this.http.post<AuthResponseResource>(`${this.endpointUrl}/register`, body).pipe(
      map(response => IamAssembler.toAuthSessionFromResponse(response)),
      catchError(this.handleError('Failed to register'))
    );
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let message = operation;
      if (error.status === 401 || error.status === 403) {
        message = `${operation}: Invalid credentials`;
      } else if (error.status === 404) {
        message = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        message = `${operation}: ${error.error.message}`;
      } else if (typeof error.error === 'object' && error.error?.message) {
        message = `${operation}: ${error.error.message}`;
      } else {
        message = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(message));
    };
  }
}
