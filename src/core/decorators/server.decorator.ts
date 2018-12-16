import 'reflect-metadata';
import { Injector } from '../../injector.class';
import { ServerConfig } from '../interfaces/external/server-config.interface';
import { Type } from '../interfaces/internal/type.interface';
import { HttpServer } from '../util/server.class';

const defaultConfig: ServerConfig = {
    port: 3000,
    host: '127.0.0.1',
    debug: false,
    imports: [],
    basePath: '',
    routes: []
};

/**
 * Used to configure the server, instanciate dependencies and start it
 * @param config Server Configuration
 */
export function Server(config?: ServerConfig) {
    config = Object.assign({}, defaultConfig, config);
    const server = Injector.resolve<HttpServer>(HttpServer);
    server.configure(config);
    config.imports.forEach(module => {
        Injector.resolve<any>(module);
    });
    return function(constructor: Type<any>) {
        constructor.prototype.server = server;
        Injector.resolve(constructor);
    };
}
