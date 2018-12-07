import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { Logger } from '../../logger.service';
import { requestHandler } from './request-handler.factory';

/**
 * Registers an endpoint in express
 * Creates the handler and adds it to the route
 * @param route Route object express
 * @param endpoint Enpoint to register
 */
export function registerEndpoint(route, endpoint: Endpoint, routeInstance) {
    Logger.debug(' Endpoint:', endpoint.config.method, endpoint.config.route);
    let middleware = [];
    if (endpoint.config.middleware) {
        middleware.push(...endpoint.config.middleware);
    }
    middleware.push(requestHandler(endpoint, routeInstance));
    const epRoute = endpoint.config.route.charAt(0) === '/' ? endpoint.config.route : '/' + endpoint.config.route;
    route[endpoint.config.method.toLocaleLowerCase()](epRoute, ...middleware);
}
