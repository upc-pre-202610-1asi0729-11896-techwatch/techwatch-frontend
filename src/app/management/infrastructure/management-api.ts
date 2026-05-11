import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {BaseApi} from '../../shared/interface/base-api';

import {HomeApiEndpoints} from './home/home-api-endpoints';
import {HomeEntity} from '../domain/models/home/home-entity';

import {DeviceEntity} from '../domain/models/device/device-entity';
import {DevicesApiEndpoints} from './device/devices-api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ManagementApi extends BaseApi {
  private readonly homeEndpoint: HomeApiEndpoints;
  private readonly deviceEndpoint: DevicesApiEndpoints;

  constructor(http: HttpClient) {
    super();
    this.homeEndpoint = new HomeApiEndpoints(http);
    this.deviceEndpoint = new DevicesApiEndpoints(http);
  }
  //
  // Homes
  getHomes(): Observable<HomeEntity[]> {
    return this.homeEndpoint.getAll();
  }

  getHome(id: number): Observable<HomeEntity> {
    return this.homeEndpoint.getById(id);
  }

  createHome(home: HomeEntity): Observable<HomeEntity> {
    return this.homeEndpoint.create(home);
  }

  updateHome(home: HomeEntity): Observable<HomeEntity> {
    return this.homeEndpoint.update(home, home.id);
  }

  deleteHome(id: number): Observable<void> {
    return this.homeEndpoint.delete(id);
  }
  // Devices
  getDevices(): Observable<DeviceEntity[]> {
    return this.deviceEndpoint.getAll();
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
