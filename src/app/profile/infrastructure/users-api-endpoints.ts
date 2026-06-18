import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs';

import {BaseApiEndpoints} from '../../shared/interface/base-api-endpoints';
import {environment} from '../../../environments/environment';
import {UserProfileEntity} from '../domain/model/user-profile.entity';
import {UserProfileResource, UserProfileResponse} from './profile-resource';
import {ProfileAssembler} from './profile-assembler';

export class UsersApiEndpoints extends BaseApiEndpoints<
  UserProfileEntity,
  UserProfileResource,
  UserProfileResponse,
  ProfileAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.usersEndpointPath}`, new ProfileAssembler());
  }

  /** GET /users/{userId} */
  getByUserId(userId: number): Observable<UserProfileEntity> {
    return this.getById(userId);
  }
}
