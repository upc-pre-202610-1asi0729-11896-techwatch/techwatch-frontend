import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {HomeApiEndpoints} from './home/home-api-endpoints';
import {BaseApi} from '../../shared/interface/base-api';
import {HomeEntity} from '../domain/models/home/home-entity';

@Injectable({
  providedIn: 'root',
})
export class ManagementApi extends BaseApi {
  private readonly homeEndpoint: HomeApiEndpoints;

  constructor(http: HttpClient) {
    super();
    this.homeEndpoint = new HomeApiEndpoints(http);
  }

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
}
