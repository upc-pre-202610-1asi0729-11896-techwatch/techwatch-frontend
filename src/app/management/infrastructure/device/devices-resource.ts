import {BaseResource} from '../../../shared/interface/base-resource';

export interface DevicesResource extends BaseResource {
  id: number;
  spaceId: number;
  name: string;
  brand: string;
  model: string;
  type: string;
  status: string;
  powerWatts: number;
}
