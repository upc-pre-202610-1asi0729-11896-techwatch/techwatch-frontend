import {BaseResource} from '../../shared/interface/base-resource';
import {BaseResponse} from '../../shared/interface/base-response';

export interface SubscriptionResource {
  startedAt: string;
  expiresAt: string;
}

export interface UserProfileResource extends BaseResource {
  id: number;
  name: string;
  email: string;
  plan: string;
  createdAt: string;
  subscription?: SubscriptionResource | null;
}

export interface UserProfileResponse extends BaseResponse {
  profiles: UserProfileResource[];
}
