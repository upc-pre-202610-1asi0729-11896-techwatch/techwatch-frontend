import {BaseAssembler} from '../../../shared/interface/base-assembler';

import {DeviceEntity} from '../../domain/models/device/device-entity';
import {DevicesResource} from './devices-resource';
import {DevicesResponse} from './devices-response';

export class DevicesAssembler implements BaseAssembler<DeviceEntity, DevicesResource, DevicesResponse>{

  toEntityFromResource(resource: DevicesResource): DeviceEntity {
    return new DeviceEntity({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      powerWatts: resource.powerWatts,
      homeId: resource.homeId,
    });
  }
  toResourceFromEntity(entity: DeviceEntity): DevicesResource {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      powerWatts: entity.powerWatts,
      homeId: entity.homeId,
    } as DevicesResource;
  }
  toEntitiesFromResponse(response: DevicesResponse): DeviceEntity[] {
    console.log(response);
    return response.devices.map(resource=> this.toEntityFromResource(resource as DevicesResource));
  }
}

