import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HomeResource} from './home-resource';
import {HomeAssembler} from './home-assembler';
import {HomeEntity} from '../../domain/models/home/home-entity';
import {HomeResponse} from './home-response';
import {BaseApiEndpoints} from '../../../shared/interface/base-api-endpoints';


export class HomeApiEndpoints extends BaseApiEndpoints<HomeEntity, HomeResource, HomeResponse, HomeAssembler>{
  constructor(http: HttpClient) {
    super(http, `${environment.providerApiBaseUrl}${environment.providerHomeEndPointPath}`, new HomeAssembler());
  }
}
