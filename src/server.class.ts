import * as bodyParse from 'body-parser';
import * as express from 'express';

import { Injector } from './injector.class';
import { CustomParamConfig } from './interfaces/custom-param.interface';
import { Endpoint } from './interfaces/endpoint.interface';
import { Route } from './interfaces/route.interface';
import { ServerConfig } from './interfaces/server-config.interface';
import { Logger } from './logger.service';
import { defaultRequestHandler } from './request-handler/default-request-handler.function';
import { registerEndpoint } from './request-handler/register-endpoint.function';

class ExpressServer {
    private app;
    config: ServerConfig;

    customParams: CustomParamConfig[] = [];
    routes: Route[] = [];
    endpoints: Endpoint[] = [];

    constructor() {
        this.app = express();
        this.app.use(bodyParse.json());
    }

    register(route) {
        // This so the decorator gets called
    }

    registerParameter(param: CustomParamConfig) {
        this.customParams.push(param);
    }

    registerEndpoint(endpoint: Endpoint) {
        this.endpoints.push(endpoint);
    }

    registerRoute(service: Route) {
        const serviceEndpoints = this.endpoints.filter(
            (endpoint: Endpoint) => endpoint.config.serviceClass === service.constructorFunction.name
        );
        const serviceInstance = Injector.resolve(service.constructorFunction);
        service.instance = serviceInstance;

        serviceEndpoints.forEach(endpoint => {
            endpoint.route = service;
        });

        this.routes.push(service);
    }

    prepareExpress() {
        const route = express.Router();
        this.endpoints.forEach((endpoint: Endpoint) => {
            registerEndpoint(route, endpoint);
        });
        defaultRequestHandler(route, this.endpoints);
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
        this.prepareExpress();
        this.app.listen(this.config.port, () => Logger.log(`Server listening on port ${this.config.port}!`));
    }
}

export const expressServer = new ExpressServer();
