import { User } from '../common';
import * as Autocomplete from './Autocomplete';
import * as Search from './Search';
import * as SmartCollection from './SmartCollection';
import * as Recommendations from './Recommendations';
import * as Feedback from './Feedback';
import * as Params from './params';

/**
 * Request method.
 */
export enum Method {
  POST = 'post',
  JSONP = 'jsonp',
}

/**
 * Represents a request.
 */
export type Request =
  | Autocomplete.Request
  | Search.Request
  | SmartCollection.Request
  | Recommendations.Request
  | Feedback.Request;

/** Request body */
export type Body = CommonParams & SpecificParams;

/**
 * Common request body parameters.
 */
export interface CommonParams {
  /** A timestamp from the client side of the user */
  t_client: number;
  user: User;
  key: string;
  log?: boolean;
}

/**
 * Request body parameters depending on the request type.
 */
export type SpecificParams =
  | Autocomplete.Params
  | Search.Params
  | SmartCollection.Params
  | Recommendations.Params
  | Feedback.Params;

export { Type } from './Type';
export {
  Params,
  Autocomplete,
  Search,
  SmartCollection,
  Recommendations,
  Feedback,
};