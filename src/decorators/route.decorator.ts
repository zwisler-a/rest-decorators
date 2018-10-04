import { RouteConfig } from '../interfaces/route-config.interface';
import { expressServer } from '../server.class';

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
        expressServer.registerRoute({
            config: Object.assign({}, defaultConfig, config),
            constructorFunction: constructor
        });
    };
}
