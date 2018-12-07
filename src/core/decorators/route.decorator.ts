import { RouteConfig } from '../interfaces/external/route-config.interface';
import { Route } from '../interfaces/internal/route.interface';

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
        let _bridge: Route | {} = constructor.prototype['_bridge'];
        if (!_bridge) {
            constructor.prototype['_bridge'] = {};
            _bridge = constructor.prototype['_bridge'];
        }
        _bridge['config'] = Object.assign({}, defaultConfig, config);
    };
}
