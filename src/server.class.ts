import * as bodyParse from 'body-parser';
import * as express from 'express';

import { Pool } from './class-pool.class';
import { Injector } from './injector.class';
import { Endpoint } from './core/interfaces/internal/endpoint.interface';
import { Route } from './core/interfaces/internal/route.interface';
import { ServerConfig } from './core/interfaces/external/server-config.interface';
import { Logger } from './logger.service';
import { registerEndpoint } from './core/util/register-endpoint.function';
import { Service } from './core/decorators/service.decorator';

@Service()
export class HttpServer {
    app;
    config: ServerConfig;
    endpoints: Endpoint[];

    constructor() {
        this.app = express();
        this.app.use(bodyParse.json());
    }

    assembleRoute(route: Route) {
        const serviceEndpoints = Pool.endpoints.filter(
            (endpoint: Endpoint) => endpoint.config.serviceClass === route.constructorFunction.name
        );
        const serviceInstance = Injector.resolve(route.constructorFunction, this.config.providers);
        route.instance = serviceInstance;

        route.endpoints.forEach(endpoint => {
            endpoint.route = route;
        });
    }

    prepareExpress() {
        const route = express.Router();
        this.config.routes.forEach(route => this.assembleRoute(route.constructor['_bridge']));
        Pool.endpoints.forEach((endpoint: Endpoint) => {
            registerEndpoint(route, endpoint);
        });
        // defaultRequestHandler(route, this.endpoints);
        this.app.use('/' + this.config.basePath, route);
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
            this.app.use(express.static(this.config.staticPath));
        }

        this.prepareExpress();
        this.app.listen(this.config.port, () => Logger.log(`Server listening on port ${this.config.port}!`));
    }
}
