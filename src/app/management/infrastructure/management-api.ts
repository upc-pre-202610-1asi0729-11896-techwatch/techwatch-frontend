import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../shared/interface/base-api';

import {PropertyEntity} from '../domain/models/property/property-entity';
import {SpaceEntity} from '../domain/models/property/space-entity';
import {PropertiesApiEndpoints} from './property/properties-api-endpoints';

import {DeviceEntity} from '../domain/models/device/device-entity';
import {DevicesApiEndpoints} from './device/devices-api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ManagementApi extends BaseApi {
  private readonly propertyEndpoint: PropertiesApiEndpoints;
  private readonly deviceEndpoint: DevicesApiEndpoints;

  constructor(http: HttpClient) {
    super();
    this.propertyEndpoint = new PropertiesApiEndpoints(http);
    this.deviceEndpoint = new DevicesApiEndpoints(http);
  }

  // Properties
  getPropertiesByUserId(userId: number): Observable<PropertyEntity[]> {
    return this.propertyEndpoint.getByUserId(userId);
  }

  getProperty(id: number): Observable<PropertyEntity> {
    return this.propertyEndpoint.getById(id);
  }

  createProperty(property: PropertyEntity): Observable<PropertyEntity> {
    return this.propertyEndpoint.create(property);
  }

  createSpace(propertyId: number, name: string, description: string): Observable<SpaceEntity> {
    return this.propertyEndpoint.createSpace(propertyId, name, description);
  }

  // Devices
  getDevicesBySpaceId(spaceId: number): Observable<DeviceEntity[]> {
    return this.deviceEndpoint.getBySpaceId(spaceId);
  }

  getDevice(id: number): Observable<DeviceEntity> {
    return this.deviceEndpoint.getById(id);
  }

  createDevice(device: DeviceEntity): Observable<DeviceEntity> {
    return this.deviceEndpoint.create(device);
  }

  updateDevice(device: DeviceEntity): Observable<DeviceEntity> {
    return this.deviceEndpoint.update(device, device.id);
  }

  deleteDevice(id: number): Observable<void> {
    return this.deviceEndpoint.delete(id);
  }
}
