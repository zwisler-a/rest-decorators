import { Endpoint } from '../interfaces/endpoint.interface';
import { Logger } from '../logger.service';
import { requestHandler } from './request-handler.factory';

/**
 * Registers an endpoint in express
 * Creates the handler and adds it to the route
 * @param route Route object express
 * @param endpoint Enpoint to register
 */
export function registerEndpoint(route, endpoint: Endpoint) {
    const path = [endpoint.route.config.basePath, endpoint.config.route].join('/');

    Logger.debug('Endpoint:', endpoint.config.method, path, endpoint.config.parameterTypes.join(', '));

    let middleware;
    if (endpoint.route.config.middleware) {
        middleware = [...endpoint.route.config.middleware];
    } else {
        middleware = [];
    }

    if (endpoint.config.middleware) {
        middleware.concat(endpoint.config.middleware);
    }
    middleware.push(requestHandler(endpoint));

    route[endpoint.config.method.toLocaleLowerCase()](path, middleware);
}
