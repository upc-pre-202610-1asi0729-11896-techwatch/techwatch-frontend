import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../shared/interface/base-api';
import {UserProfileEntity} from '../domain/model/user-profile.entity';
import {UsersApiEndpoints} from './users-api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi extends BaseApi {
  private readonly usersEndpoint: UsersApiEndpoints;

  constructor(http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoints(http);
  }

  getProfileByUserId(userId: number): Observable<UserProfileEntity> {
    return this.usersEndpoint.getByUserId(userId);
  }

  updateProfile(profile: UserProfileEntity): Observable<UserProfileEntity> {
    return this.usersEndpoint.update(profile, profile.id);
  }
}
