import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/interface/base-api';
import {Consumption} from '../domain/model/consumption.entity';
import {ConsumptionApiEndpoint} from './consumption-api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsApi extends BaseApi {
  private readonly consumptionEndpoint: ConsumptionApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.consumptionEndpoint = new ConsumptionApiEndpoint(http);
  }

  getConsumptions(): Observable<Consumption[]> {
    return this.consumptionEndpoint.getAll();
  }

  createConsumption(consumption: Consumption): Observable<Consumption> {
    return this.consumptionEndpoint.create(consumption);
  }
}
