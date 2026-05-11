import {BaseResource} from '../../../shared/interface/base-resource';

export interface HomeResource extends BaseResource{
  id: number;
  name: string;
  type: string;
  userId: number;
}
