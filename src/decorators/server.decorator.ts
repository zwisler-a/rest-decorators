import 'reflect-metadata';

import { generateApi } from '../api-generator/main';
import { Injector } from '../injector.class';
import { ServerConfig } from '../interfaces/server-config.interface';
import { Type } from '../interfaces/type.interface';
import { expressServer } from '../server.class';

const defaultConfig: ServerConfig = {
    port: 3000,
    host: '127.0.0.1',
    debug: false,
    autoStart: true,
    apiGenPath: null,
    basePath: ''
};

/**
 * Used to configure the server, instanciate dependencies and start it
 * @param config Server Configuration
 */
export function Server(config?: ServerConfig) {
    config = Object.assign({}, defaultConfig, config);
    expressServer.configure(config);
    if (defaultConfig.autoStart) {
        expressServer.start();
    }
    if (config.apiGenPath) {
        generateApi(config.apiGenPath);
    }

    return function(constructor: Type<any>) {
        Injector.resolve(constructor);
    };
}
