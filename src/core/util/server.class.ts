import * as bodyParse from 'body-parser';
import * as express from 'express';

import { Logger } from '../../logger.service';
import { Service } from '../decorators/service.decorator';
import { Injector } from '../di/injector.class';
import { SERVER_CONFIG } from '../interfaces/external/server-config.token';
import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { Route } from '../interfaces/internal/route.interface';
import { Type } from '../interfaces/internal/type.interface';
import { ResponseHandlerFactory } from './response-handler.factory';

@Service()
export class HttpServer {
    app;
    endpoints: Endpoint[];

    constructor(private injector: Injector, private config: SERVER_CONFIG, private responseHandler: ResponseHandlerFactory) {
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
        if (_bridge.config.middleware) {
            expressRoute.use(..._bridge.config.middleware);
        }
        endpoints.forEach(ep => {
            this.responseHandler.registerEndpoint(expressRoute, ep, serviceInstance);
        });
        expressRouter.use(_bridge.config.basePath, expressRoute);
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

        if(this.config.fallbackResponse) {
            this.app.use(this.config.fallbackResponse);
        }

        this.app.listen(this.config.port, this.config.host, () => Logger.log(`Server listening on port ${this.config.port}!`));
    }
}
