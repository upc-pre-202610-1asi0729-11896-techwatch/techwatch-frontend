import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs';

import {BaseApiEndpoints} from '../../../shared/interface/base-api-endpoints';
import {environment} from '../../../../environments/environment';
import {PropertyEntity} from '../../domain/models/property/property-entity';
import {SpaceEntity} from '../../domain/models/property/space-entity';
import {PropertyResource, SpaceResource} from './property-resource';
import {PropertyResponse} from './property-response';
import {PropertyAssembler} from './property-assembler';

export class PropertiesApiEndpoints extends BaseApiEndpoints<PropertyEntity, PropertyResource, PropertyResponse, PropertyAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.propertiesEndpointPath}`, new PropertyAssembler());
  }

  /** GET /properties?userId={userId} — the backend returns a bare array. */
  getByUserId(userId: number): Observable<PropertyEntity[]> {
    return this.http.get<PropertyResource[]>(`${this.endpointUrl}?userId=${userId}`).pipe(
      map(resources => resources.map(resource => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to fetch properties'))
    );
  }

  /** POST /properties/{propertyId}/spaces */
  createSpace(propertyId: number, name: string, description: string): Observable<SpaceEntity> {
    return this.http.post<SpaceResource>(`${this.endpointUrl}/${propertyId}/spaces`, {name, description}).pipe(
      map(resource => new SpaceEntity({id: resource.id, name: resource.name, description: resource.description})),
      catchError(this.handleError('Failed to create space'))
    );
  }
}
