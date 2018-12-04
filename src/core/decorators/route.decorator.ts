import { Pool } from '../../class-pool.class';
import { RouteConfig } from '../interfaces/external/route-config.interface';

const defaultConfig = {
    basePath: ''
};

/**
 * Defines a route inside the server. Can have middleware and a basePath
 * This will be a service in the generated API
 *
 * @example
 * @Route()
 * class API {}
 *
 * @param config Configuration of the route
 */
export function Route(config?: RouteConfig) {
    return function(constructor: Function) {
        constructor.prototype['_bridge'].config = {
            config: Object.assign({}, defaultConfig, config)
        };

        Pool.addRoute({
            config: Object.assign({}, defaultConfig, config),
            constructorFunction: constructor
        });
    };
}
