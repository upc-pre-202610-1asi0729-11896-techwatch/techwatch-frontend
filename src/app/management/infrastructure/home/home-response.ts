import {BaseResponse} from '../../../shared/interface/base-response';
import {HomeResource} from './home-resource';

export interface HomeResponse extends BaseResponse{
  homes: HomeResource[];
}
