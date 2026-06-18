import {UserEntity} from './user-entity';

/**
 * Auth session aggregate: JWT token paired with the authenticated user.
 * Mirrors the backend IAM `AuthSession` response.
 */
export class AuthSessionEntity {
  private _token: string;
  private _user: UserEntity;

  constructor(session: {token: string; user: UserEntity}) {
    this._token = session.token;
    this._user = session.user;
  }

  get token(): string { return this._token; }
  set token(value: string) { this._token = value; }

  get user(): UserEntity { return this._user; }
  set user(value: UserEntity) { this._user = value; }
}
