import * as bodyParse from 'body-parser';
import * as express from 'express';

import { Logger } from '../../logger.service';
import { Service } from '../decorators/service.decorator';
import { Injector } from '../di/injector.class';
import { SERVER_CONFIG } from '../interfaces/external/server-config.token';
import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { Route } from '../interfaces/internal/route.interface';
import { Type } from '../interfaces/internal/type.interface';
import { ResponseFactory } from './response.factory';
import { typeCheck } from './typecheck.function';

@Service()
export class HttpServer {
    app;
    endpoints: Endpoint[];

    constructor(private injector: Injector, private config: SERVER_CONFIG, private responseFactory: ResponseFactory) {
        this.app = express();
        this.app.use(bodyParse.json());

        Logger.DEBUG = config.debug;
        Logger.debug('Config', this.config);
    }

    assembleRoute(route: Type<any>, expressRouter) {
        const expressRoute = express.Router();
        const _bridge: Route = route.prototype['_bridge'];
        const endpoints = _bridge.endpoints;

        const serviceInstance = this.injector.resolve(route);

        _bridge.instance = serviceInstance;
        Logger.debug('Route: ', _bridge.config.basePath);
        endpoints.forEach(ep => {
            this.registerEndpoint(expressRoute, ep, serviceInstance);
        });
        expressRouter.use(_bridge.config.basePath, expressRoute);
    }

    private registerEndpoint(route, endpoint: Endpoint, routeInstance) {
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

                Logger.debug(endpoint.config.method, req.url, parameters);
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

            error('Missing parameter: "' + param + '". Parameters should be [' + ep.config.requiredParams.join(', ') + ']');
        });

        suppliedParams.forEach((name, idx) => {
            if (!typeCheck(suppliedParams[idx], ep.config.parameterTypes[idx])) {
                error('Type missmatch: ' + name + ' should have properties ' + Object.keys(ep.config.parameterTypes[idx]));
            }
        });

        return suppliedParams;
    }

    prepareExpress() {
        const expressRoute = express.Router();
        this.config.routes.forEach(route => this.assembleRoute(route, expressRoute));
        this.app.use('/' + this.config.basePath, expressRoute);
    }

    async start() {
        if (!this.config) {
            throw new Error('Server is not configured!');
        }

        if (this.config.middleware) {
            this.app.use(...this.config.middleware);
        }
        if (this.config.staticPath) {
            if (Array.isArray(this.config.staticPath)) {
                this.config.staticPath.forEach(path => {
                    this.app.use(express.static(path));
                });
            } else {
                this.app.use(express.static(this.config.staticPath));
            }
        }

        this.prepareExpress();
        this.app.listen(this.config.port, this.config.host, () => Logger.log(`Server listening on port ${this.config.port}!`));
    }
}
