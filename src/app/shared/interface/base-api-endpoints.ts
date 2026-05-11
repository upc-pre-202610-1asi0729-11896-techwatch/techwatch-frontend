import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs';
import {BaseEntity} from './base-entity';
import {BaseResource} from './base-resource';
import {BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';

export class BaseApiEndpoints<
  Tentity extends BaseEntity,
  Tresource extends BaseResource,
  Tresponse extends BaseResponse,
  Tassembler extends BaseAssembler<Tentity, Tresource, Tresponse>
> {
  constructor(
    protected http :  HttpClient,
    protected endpointUrl : string,
    protected assembler :Tassembler
  ) {}

  getAll(): Observable<Tentity[]>{
    return this.http.get<Tresponse | Tresource[]>(this.endpointUrl).pipe(
      map(response=>{
        console.log(response);

        return this.assembler.toEntitiesFromResponse(response as Tresponse)
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  protected handleError(operation: string){
    return (errors: HttpErrorResponse): Observable<never> => {
      let errorMessage = operation;
      if(errors.status === 404){
        errorMessage = `${operation} : Resource not found`;
      } else if(errors.error instanceof ErrorEvent){
        errorMessage = `${operation} : ${errors.error.message}`;
      } else {
        errorMessage = `${operation} : ${errors.statusText || 'Unexpected error'}`;
      }
      return throwError(()=>new Error(errorMessage));
    };
  }
}

