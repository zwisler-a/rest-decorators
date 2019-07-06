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

}
