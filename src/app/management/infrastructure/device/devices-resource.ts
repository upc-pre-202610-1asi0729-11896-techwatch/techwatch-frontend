import {BaseResource} from '../../../shared/interface/base-resource';

export interface DevicesResource extends BaseResource {
  id: number;
  name: string;
  type: string;
  powerWatts: number;
  status: string;
  homeId: number;
}
