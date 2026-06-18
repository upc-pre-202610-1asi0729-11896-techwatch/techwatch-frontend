import {computed, inject, Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';

import {SessionStore} from '../../shared/application/session-store';
import {AuthSessionEntity} from '../domain/model/auth-session-entity';
import {UserEntity} from '../domain/model/user-entity';
import {IamApi} from '../infrastructure/iam-api';
import {LoginRequest, RegisterRequest} from '../infrastructure/iam-resources';

const TOKEN_STORAGE_KEY = 'techwatch_auth_token';
const USER_STORAGE_KEY = 'techwatch_auth_user';

/**
 * Application store for the IAM context: sign-in, registration, and the
 * current authenticated session.
 */
@Injectable({
  providedIn: 'root',
})
export class IamStore {
  private readonly iamApi = inject(IamApi);
  private readonly session = inject(SessionStore);

  private readonly currentUserSignal = signal<UserEntity | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();

  private readonly tokenSignal = signal<string | null>(null);
  readonly token = this.tokenSignal.asReadonly();

  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.restoreSession();
  }

  login(email: string, password: string, onSuccess?: () => void): void {
    const body: LoginRequest = {email, password};
    this.authenticate(() => this.iamApi.login(body), 'Failed to sign in', onSuccess);
  }

  register(name: string, email: string, password: string, plan = 'free', onSuccess?: () => void): void {
    const body: RegisterRequest = {name, email, password, plan};
    this.authenticate(() => this.iamApi.register(body), 'Failed to register', onSuccess);
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    this.session.clearUser();
  }

  private authenticate(
    request: () => Observable<AuthSessionEntity>,
    fallback: string,
    onSuccess?: () => void,
  ): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    request().subscribe({
      next: authSession => {
        this.applySession(authSession);
        this.loadingSignal.set(false);
        onSuccess?.();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, fallback));
        this.loadingSignal.set(false);
      },
    });
  }

  private applySession(authSession: AuthSessionEntity): void {
    this.currentUserSignal.set(authSession.user);
    this.tokenSignal.set(authSession.token);
    this.session.setUser(authSession.user.id);
    localStorage.setItem(TOKEN_STORAGE_KEY, authSession.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
      id: authSession.user.id,
      name: authSession.user.name,
      email: authSession.user.email,
    }));
  }

  private restoreSession(): void {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!token || !userJson) return;

    try {
      const user = JSON.parse(userJson) as {id: number; name: string; email: string};
      this.currentUserSignal.set(new UserEntity(user));
      this.tokenSignal.set(token);
      this.session.setUser(user.id);
    } catch {
      this.logout();
    }
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
