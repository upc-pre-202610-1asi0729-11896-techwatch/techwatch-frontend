import {BaseAssembler} from '../../../shared/interface/base-assembler';
import {DeviceEntity} from '../../domain/models/device/device-entity';
import {DevicesResource} from './devices-resource';
import {DevicesResponse} from './devices-response';

export class DevicesAssembler implements BaseAssembler<DeviceEntity, DevicesResource, DevicesResponse> {

  toEntityFromResource(resource: DevicesResource): DeviceEntity {
    return new DeviceEntity({
      id: resource.id,
      spaceId: resource.spaceId,
      name: resource.name,
      brand: resource.brand,
      model: resource.model,
      type: resource.type,
      status: resource.status,
      powerWatts: resource.powerWatts,
    });
  }

  toResourceFromEntity(entity: DeviceEntity): DevicesResource {
    return {
      id: entity.id,
      spaceId: entity.spaceId,
      name: entity.name,
      brand: entity.brand,
      model: entity.model,
      type: entity.type,
      status: entity.status,
      powerWatts: entity.powerWatts,
    } as DevicesResource;
  }

  toEntitiesFromResponse(response: DevicesResponse): DeviceEntity[] {
    return response.devices.map(resource => this.toEntityFromResource(resource));
  }
}
