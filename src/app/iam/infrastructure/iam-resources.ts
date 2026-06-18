import {BaseResource} from '../../shared/interface/base-resource';

export interface UserResource extends BaseResource {
  id: number;
  name: string;
  email: string;
}

/** Response body for POST /auth/login and POST /auth/register. */
export interface AuthResponseResource {
  token: string;
  user: UserResource;
}

/** Request body for POST /auth/login. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Request body for POST /auth/register. */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  plan?: string;
}
