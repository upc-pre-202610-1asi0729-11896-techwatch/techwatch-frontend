import {BaseResponse} from '../../../shared/interface/base-response';

/**
 * The backend returns property lists as bare JSON arrays, so this wrapper is
 * not used over the wire; it only satisfies the generic BaseApiEndpoints shape.
 */
export interface PropertyResponse extends BaseResponse {
  properties: import('./property-resource').PropertyResource[];
}
