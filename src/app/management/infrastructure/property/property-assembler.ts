import {BaseAssembler} from '../../../shared/interface/base-assembler';
import {PropertyEntity} from '../../domain/models/property/property-entity';
import {SpaceEntity} from '../../domain/models/property/space-entity';
import {PropertyResource, SpaceResource} from './property-resource';
import {PropertyResponse} from './property-response';

export class PropertyAssembler implements BaseAssembler<PropertyEntity, PropertyResource, PropertyResponse> {

  toEntityFromResource(resource: PropertyResource): PropertyEntity {
    return new PropertyEntity({
      id: resource.id,
      userId: resource.userId,
      name: resource.name,
      address: resource.address,
      type: resource.type,
      spaces: (resource.spaces ?? []).map(s => this.toSpaceEntityFromResource(s)),
    });
  }

  toResourceFromEntity(entity: PropertyEntity): PropertyResource {
    return {
      id: entity.id,
      userId: entity.userId,
      name: entity.name,
      address: entity.address,
      type: entity.type,
      spaces: entity.spaces.map(s => ({id: s.id, name: s.name, description: s.description})),
    } as PropertyResource;
  }

  toEntitiesFromResponse(response: PropertyResponse): PropertyEntity[] {
    return response.properties.map(resource => this.toEntityFromResource(resource));
  }

  private toSpaceEntityFromResource(resource: SpaceResource): SpaceEntity {
    return new SpaceEntity({
      id: resource.id,
      name: resource.name,
      description: resource.description,
    });
  }
}
