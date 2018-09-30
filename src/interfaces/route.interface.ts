import { RouteConfig } from './route-config.interface';

export interface Route {
    config: RouteConfig;
    constructorFunction;
    instance?: any;
}
