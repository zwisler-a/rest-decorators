import { RouteConfig } from '../external/route-config.interface';

export interface Route {
    config: RouteConfig;
    constructorFunction;
    instance?: any;
}
