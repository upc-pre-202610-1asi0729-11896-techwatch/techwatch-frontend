import {BaseAssembler} from '../../shared/interface/base-assembler';
import {SubscriptionEntity, UserProfileEntity} from '../domain/model/user-profile.entity';
import {SubscriptionResource, UserProfileResource, UserProfileResponse} from './profile-resource';

export class ProfileAssembler implements BaseAssembler<UserProfileEntity, UserProfileResource, UserProfileResponse> {

  toEntityFromResource(resource: UserProfileResource): UserProfileEntity {
    return new UserProfileEntity({
      id: resource.id,
      name: resource.name,
      email: resource.email,
      plan: resource.plan,
      createdAt: resource.createdAt,
      subscription: resource.subscription
        ? new SubscriptionEntity({
            startedAt: resource.subscription.startedAt,
            expiresAt: resource.subscription.expiresAt,
          })
        : null,
    });
  }

  toResourceFromEntity(entity: UserProfileEntity): UserProfileResource {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      plan: entity.plan,
      createdAt: entity.createdAt,
      subscription: entity.subscription
        ? {startedAt: entity.subscription.startedAt, expiresAt: entity.subscription.expiresAt}
        : null,
    };
  }

  toEntitiesFromResponse(response: UserProfileResponse): UserProfileEntity[] {
    return response.profiles.map(resource => this.toEntityFromResource(resource));
  }
}
