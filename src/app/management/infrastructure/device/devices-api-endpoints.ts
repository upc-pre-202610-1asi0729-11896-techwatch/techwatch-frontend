import {BaseApiEndpoints} from '../../../shared/interface/base-api-endpoints';
import {DeviceEntity} from '../../domain/models/device/device-entity';
import {DevicesResource} from './devices-resource';
import {DevicesResponse} from './devices-response';
import {DevicesAssembler} from './devices-assembler';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

export class DevicesApiEndpoints extends BaseApiEndpoints<DeviceEntity, DevicesResource, DevicesResponse, DevicesAssembler>{
  constructor(http: HttpClient) {
    super(http, `${environment.providerApiBaseUrl}${environment.providerDeviceEndPointPath}`, new DevicesAssembler());
  }
}
