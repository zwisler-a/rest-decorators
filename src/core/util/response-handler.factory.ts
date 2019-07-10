import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { Logger } from '../../logger.service';
import { ResponseFactory } from './response.factory';
import { Service } from '../decorators/service.decorator';

@Service()
export class ResponseHandlerFactory {
    constructor(private responseFactory: ResponseFactory) {}

    public registerEndpoint(route, endpoint: Endpoint, routeInstance) {
        Logger.debug(' Endpoint:', endpoint.config.method, endpoint.config.route, ', Params:', endpoint.config.parameterNames);
        let middleware = [];
        if (endpoint.config.middleware) {
            middleware.push(...endpoint.config.middleware);
        }
        middleware.push(this.createRequestHandler(endpoint, routeInstance));
        const epRoute = endpoint.config.route.charAt(0) === '/' ? endpoint.config.route : '/' + endpoint.config.route;
        route[endpoint.config.method.toLocaleLowerCase()](epRoute, ...middleware);
    }

    private createRequestHandler(endpoint: Endpoint, routeInstance) {
        return (req, res) => {
            try {
                const parameters = this.getRequestParameters(endpoint, req);

                Logger.debug(endpoint.config.method, req.url);
                const response = Promise.resolve(endpoint.method.call(routeInstance, ...parameters));
                response
                    .then(result => {
                        Logger.debug('return', result);
                        res.send(this.responseFactory.result(result));
                    })
                    .catch(e => {
                        Logger.debug(e.message, e.stack);
                        this.responseFactory.error(e, res);
                    });
            } catch (e) {
                Logger.debug(e.message, e.stack);
                this.responseFactory.error(e, res);
            }
        };
    }

    private getRequestParameters(ep: Endpoint, req) {
        const error = err => {
            throw new Error(err);
        };

        const defined = val => typeof val !== 'undefined';

        [req.params, req.query, req.body].forEach(source => {
            if (Object.keys(source).length > ep.config.requiredParams.length) {
                error('To many parameters. Parameters should be [' + ep.config.requiredParams.join(', ') + ']');
            }
        });

        const suppliedParams = ep.config.parameterNames.map((param, index) => {
            if (defined(req.body[param])) return req.body[param];
            if (defined(req.params[param])) return req.params[param];
            if (defined(req.query[param])) return req.query[param];
            const customParam = (ep.config.customParams[param] || ({} as any)).paramSource;
            if (defined(req[customParam])) return req[customParam];
            if (customParam === '') return req;

            error('Missing parameter: "' + param + '". Parameters should be [' + ep.config.requiredParams.join(', ') + ']');
        });

        suppliedParams.forEach((name, idx) => {
            if (!this.typeCheck(suppliedParams[idx], ep.config.parameterTypes[idx])) {
                error('Type missmatch: ' + name + ' should have properties ' + Object.keys(ep.config.parameterTypes[idx]));
            }
        });

        return suppliedParams;
    }

    // returns false if not equal
    private typeCheck(object, desiredClass) {
        if (typeof object === 'object') {
            return !this.differes(desiredClass, object);
        } else {
            return typeof object === desiredClass ? false : true;
        }
    }

    private differes(obj1, obj2) {
        const keys = Object.keys(obj1);
        return keys.some(key => {
            if (obj2.hasOwnProperty(key)) {
                if (typeof obj1[key] === 'object') {
                    return this.differes(obj1[key], obj2[key]);
                } else {
                    return typeof obj1[key] !== typeof obj2[key];
                }
            } else {
                return true;
            }
        });
    }
}
