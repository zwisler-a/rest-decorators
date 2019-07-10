import 'reflect-metadata';

import { ServerConfig } from '../interfaces/external/server-config.interface';
import { Type } from '../interfaces/internal/type.interface';

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
    return function(constructor: Type<any>) {
        constructor.prototype['_bridge'] = config;
    };
}
