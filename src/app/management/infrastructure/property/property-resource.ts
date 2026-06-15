import {BaseResource} from '../../../shared/interface/base-resource';

export interface SpaceResource {
  id: number;
  name: string;
  description: string;
}

export interface PropertyResource extends BaseResource {
  id: number;
  userId: number;
  name: string;
  address: string;
  type: string;
  spaces: SpaceResource[];
}
