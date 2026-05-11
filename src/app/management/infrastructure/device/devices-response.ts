import {BaseResponse} from '../../../shared/interface/base-response';
import {DevicesResource} from './devices-resource';

export interface DevicesResponse extends BaseResponse{
  devices: DevicesResource[];
}
