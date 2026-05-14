import {BaseAssembler} from '../../shared/interface/base-assembler';
import {Consumption} from '../domain/model/consumption.entity';
import {ConsumptionResource, ConsumptionResponse} from './consumption-response';

export class ConsumptionAssembler implements BaseAssembler<Consumption, ConsumptionResource, ConsumptionResponse> {

  toEntityFromResource(resource: ConsumptionResource): Consumption {
    return new Consumption({
      id: resource.id,
      deviceId: resource.deviceId,
      kwh: resource.kwh,
      date: resource.date,
    });
  }

  toResourceFromEntity(entity: Consumption): ConsumptionResource {
    return {
      id: entity.id,
      deviceId: entity.deviceId,
      kwh: entity.kwh,
      date: entity.date,
    } as ConsumptionResource;
  }

  toEntitiesFromResponse(response: ConsumptionResponse): Consumption[] {
    return response.consumptions.map(r => this.toEntityFromResource(r));
  }
}
