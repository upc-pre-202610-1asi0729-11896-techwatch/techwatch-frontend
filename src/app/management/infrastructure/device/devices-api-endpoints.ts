import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs';

import {BaseApiEndpoints} from '../../../shared/interface/base-api-endpoints';
import {environment} from '../../../../environments/environment';
import {DeviceEntity} from '../../domain/models/device/device-entity';
import {DevicesResource} from './devices-resource';
import {DevicesResponse} from './devices-response';
import {DevicesAssembler} from './devices-assembler';

export class DevicesApiEndpoints extends BaseApiEndpoints<DeviceEntity, DevicesResource, DevicesResponse, DevicesAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.devicesEndpointPath}`, new DevicesAssembler());
  }

  /** GET /devices?spaceId={spaceId} — the backend returns a bare array. */
  getBySpaceId(spaceId: number): Observable<DeviceEntity[]> {
    return this.http.get<DevicesResource[]>(`${this.endpointUrl}?spaceId=${spaceId}`).pipe(
      map(resources => resources.map(resource => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to fetch devices'))
    );
  }
}
