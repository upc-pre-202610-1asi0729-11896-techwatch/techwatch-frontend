import {AuthSessionEntity} from '../domain/model/auth-session-entity';
import {UserEntity} from '../domain/model/user-entity';
import {AuthResponseResource, UserResource} from './iam-resources';

export class IamAssembler {

  static toUserEntityFromResource(resource: UserResource): UserEntity {
    return new UserEntity({
      id: resource.id,
      name: resource.name,
      email: resource.email,
    });
  }

  static toAuthSessionFromResponse(response: AuthResponseResource): AuthSessionEntity {
    return new AuthSessionEntity({
      token: response.token,
      user: IamAssembler.toUserEntityFromResource(response.user),
    });
  }
}
