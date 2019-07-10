import { Injector } from '../di/injector.class';
import { INIT_DATA } from '../interfaces/external/init-data.token';
import { Resolve } from '../interfaces/external/resolve.interface';
import { ServerConfig } from '../interfaces/external/server-config.interface';
import { SERVER_CONFIG } from '../interfaces/external/server-config.token';
import { Type } from '../interfaces/internal/type.interface';
import { ResponseHandlerFactory } from './response-handler.factory';
import { ResponseFactory } from './response.factory';
import { HttpServer } from './server.class';

export class Bridge {
    public static async bootstrap(serverClass: Type<any>) {
        const config: ServerConfig = serverClass.prototype['_bridge'];
        if (config) {
            const injector = new Injector(config.providers);
            if (config.resolve) {
                const initResolver = injector.resolve<Resolve>(config.resolve);
                const resolveData = await initResolver.resolve();
                injector.add({ provide: INIT_DATA, useValue: resolveData });
            }
            injector.addInstance(SERVER_CONFIG, config);
            injector.add(ResponseHandlerFactory);
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
