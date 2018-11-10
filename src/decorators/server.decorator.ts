import 'reflect-metadata';
import { Injector } from '../injector.class';
import { ServerConfig } from '../interfaces/server-config.interface';
import { Type } from '../interfaces/type.interface';
import { HttpServer } from '../server.class';
import { WsServer } from '../ws.server.class';

const defaultConfig: ServerConfig = {
    port: 3000,
    host: '127.0.0.1',
    debug: false,
    startWs: false,
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
    if (config.startWs) {
        Injector.resolve<WsServer>(WsServer);
    }
    server.configure(config);
    server.start();

    return function(constructor: Type<any>) {
        Injector.resolve(constructor);
    };
}
