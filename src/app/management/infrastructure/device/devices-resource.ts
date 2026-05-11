import {BaseResource} from '../../../shared/interface/base-resource';
import {HomeEntity} from '../../domain/models/home/home-entity';

export interface DevicesResource extends BaseResource{
  id: number;
  name: string;
  type: string;
  powerWatts: number;
  homeId: number;
}
