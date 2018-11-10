import { Logger } from '../logger.service';
import { processParamters } from './process-parameter.function';
import { ResponseFactory } from './response.factory';
import { Endpoint } from '../interfaces/endpoint.interface';

/**
 * Generates a function to handle incoming requests for the given endpoint
 * @param endpoint Endpoint to manage
 */
export function requestHandler(endpoint: Endpoint) {
    return (req, res) => {
        try {
            const parameters = processParamters(endpoint, req);

            Logger.debug(endpoint.config.method, req.url, parameters);
            const response = Promise.resolve(endpoint.method.call(endpoint.route.instance, ...parameters));
            response
                .then(result => {
                    Logger.debug('return', result);
                    res.send(ResponseFactory.result(result));
                })
                .catch(e => {
                    Logger.debug(e.message, e.stack);
                    const error = ResponseFactory.error(e.message);
                    res.status(500).send(error);
                });
        } catch (e) {
            Logger.debug(e.message, e.stack);
            const error = ResponseFactory.error(e.message);
            res.status(500).send(error);
        }
    };
}
