import {BaseResponse} from '../../../shared/interface/base-response';
import {DevicesResource} from './devices-resource';

/**
 * The backend returns device lists as bare JSON arrays, so this wrapper is not
 * used over the wire; it only satisfies the generic BaseApiEndpoints shape.
 */
export interface DevicesResponse extends BaseResponse {
  devices: DevicesResource[];
}
