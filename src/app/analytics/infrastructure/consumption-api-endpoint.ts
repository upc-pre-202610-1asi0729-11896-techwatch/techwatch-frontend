import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoints} from '../../shared/interface/base-api-endpoints';
import {Consumption} from '../domain/model/consumption.entity';
import {ConsumptionResource, ConsumptionResponse} from './consumption-response';
import {ConsumptionAssembler} from './consumption-assembler';

export class ConsumptionApiEndpoint extends BaseApiEndpoints<Consumption, ConsumptionResource, ConsumptionResponse, ConsumptionAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.providerApiBaseUrl}${environment.providerConsumptionsEndPointPath}`,
      new ConsumptionAssembler()
    );
  }
}
