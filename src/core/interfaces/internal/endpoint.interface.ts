import { EndpointConfigInternal } from '../external/endpoint-config.interface';
import { Route } from './route.interface';

export interface Endpoint {
    config: EndpointConfigInternal;
    route?: Route;
    method: Function;
}
