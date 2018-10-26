import * as bodyParse from 'body-parser';
import * as express from 'express';

import { Pool } from './class-pool.class';
import { Injector } from './injector.class';
import { Endpoint } from './interfaces/endpoint.interface';
import { Route } from './interfaces/route.interface';
import { ServerConfig } from './interfaces/server-config.interface';
import { Logger } from './logger.service';
import { registerEndpoint } from './request-handler/register-endpoint.function';
import { Service } from './decorators/service.decorator';

@Service()
export class HttpServer {
    app;
    config: ServerConfig;
    routes: Route[];

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

        serviceEndpoints.forEach(endpoint => {
            endpoint.route = route;
        });
    }

    prepareExpress() {
        const route = express.Router();
        this.routes.forEach(route => this.assembleRoute(route));
        Pool.endpoints.forEach((endpoint: Endpoint) => {
            registerEndpoint(route, endpoint);
        });
        // defaultRequestHandler(route, this.endpoints);
        this.app.use('/' + this.config.basePath, route);
    }

    configure(config: ServerConfig) {
        this.config = config;
        this.routes = this.config.routes.map(ctor => Pool.routes.find(route => ctor === route.constructorFunction));
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

        this.prepareExpress();
        this.app.listen(this.config.port, () => Logger.log(`Server listening on port ${this.config.port}!`));
    }
}
