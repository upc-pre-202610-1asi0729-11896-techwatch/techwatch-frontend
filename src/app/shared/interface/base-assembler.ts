import { BaseEntity } from './base-entity';
import {BaseResource} from './base-resource';
import {BaseResponse} from './base-response';

export interface BaseAssembler<Tentity extends BaseEntity, Tresource extends BaseResource, Tresponse extends BaseResponse> {
  toEntityFromResource(resource: Tresource) : Tentity;
  toResourceFromEntity(entity: Tentity) : Tresource;
  toEntitiesFromResponse(response: Tresponse) : Tentity[];
}
