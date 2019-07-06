import { Injector } from '../di/injector.class';
import { Resolve } from '../interfaces/external/resolve.interface';
import { ServerConfig } from '../interfaces/external/server-config.interface';
import { Type } from '../interfaces/internal/type.interface';
import { HttpServer } from './server.class';
import { INIT_DATA } from '../interfaces/external/init-data.token';
import { SERVER_CONFIG } from '../interfaces/external/server-config.token';
import { ResponseFactory } from './response.factory';

export class Bridge {
    public static async bootstrap(serverClass: Type<any>) {
        const config: ServerConfig = serverClass.prototype['_bridge'];
        if (config) {
            const injector = new Injector(config.providers);
            if (config.resolve) {
                const initResolver = injector.resolve<Resolve>(config.resolve);
                const resolveData = await initResolver.resolve();
                config.providers.push({ provide: INIT_DATA, useValue: resolveData });
            }
            injector.addInstance(SERVER_CONFIG, config);
            injector.add(ResponseFactory);
            const server = injector.resolve<HttpServer>(HttpServer);
            injector.addInstance(HttpServer, server);

            config.imports.forEach(module => {
                injector.resolve<any>(module);
            });
            injector.resolve(serverClass);
            server.start();
        } else {
            throw new Error('No Bridge Server!');
        }
    }
}
