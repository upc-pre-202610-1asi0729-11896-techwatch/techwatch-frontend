import {HomeResource} from './home-resource';
import {HomeEntity} from '../../domain/models/home/home-entity';
import {HomeResponse} from './home-response';
import {BaseAssembler} from '../../../shared/interface/base-assembler';

export class HomeAssembler implements BaseAssembler<HomeEntity, HomeResource, HomeResponse>{
  toEntityFromResource(resource: HomeResource): HomeEntity {
    return new HomeEntity({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      userId: resource.userId,
    });
  }
  toResourceFromEntity(entity: HomeEntity): HomeResource {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      userId: entity.userId,
    } as HomeResource;
  }
  toEntitiesFromResponse(response: HomeResponse): HomeEntity[] {
    console.log(response);
    return response.homes.map((resource)=>
      this.toEntityFromResource(resource as HomeResource))

  }
}
