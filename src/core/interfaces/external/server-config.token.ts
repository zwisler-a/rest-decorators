import { ServerConfig } from './server-config.interface';
import { Type } from '../internal/type.interface';
import { Resolve } from './resolve.interface';
import { Provider } from '../../di/provider.type';

export class SERVER_CONFIG implements ServerConfig {
    port?: number;
    host?: string;
    debug?: boolean;
    staticPath?: string | string[];
    imports?: Type<any>[];
    basePath?: string;
    middleware?: Function[];
    providers?: Provider[];
    routes: Type<any>[];
    resolve?: Type<Resolve>;
    fallbackResponse?: Function;
    constructor() {}
}
