import * as bodyParse from 'body-parser';
import * as express from 'express';

import { Injector } from '../../injector.class';
import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { Route } from '../interfaces/internal/route.interface';
import { ServerConfig } from '../interfaces/external/server-config.interface';
import { Logger } from '../../logger.service';
import { registerEndpoint } from './register-endpoint.function';
import { Service } from '../decorators/service.decorator';
import { Type } from '../interfaces/internal/type.interface';

@Service()
export class HttpServer {
    app;
    config: ServerConfig;
    endpoints: Endpoint[];

    constructor() {
        this.app = express();
        this.app.use(bodyParse.json());
    }

    assembleRoute(route: Type<any>, expressRouter) {
        const expressRoute = express.Router();
        const _bridge: Route = route.prototype['_bridge'];
        const endpoints = _bridge.endpoints;

        const serviceInstance = Injector.resolve(route, this.config.providers);

        _bridge.instance = serviceInstance;
        Logger.debug('Route: ', _bridge.config.basePath);
        endpoints.forEach(ep => {
            registerEndpoint(expressRoute, ep, serviceInstance);
        });
        expressRouter.use(_bridge.config.basePath, expressRoute);
    }

    prepareExpress() {
        const expressRoute = express.Router();
        this.config.routes.forEach(route => this.assembleRoute(route, expressRoute));
        this.app.use('/' + this.config.basePath, expressRoute);
    }

    configure(config: ServerConfig) {
        this.config = config;
        Logger.DEBUG = config.debug;
        Logger.debug('Config', this.config);
    }

    start() {
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
