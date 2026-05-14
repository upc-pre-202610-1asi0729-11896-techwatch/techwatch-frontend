import {BaseResource} from '../../shared/interface/base-resource';
import {BaseResponse} from '../../shared/interface/base-response';

export interface ConsumptionResource extends BaseResource {
  id: number;
  deviceId: number;
  kwh: number;
  date: string;
}

export interface ConsumptionResponse extends BaseResponse {
  consumptions: ConsumptionResource[];
}
