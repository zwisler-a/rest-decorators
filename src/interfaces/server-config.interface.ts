import { Type } from './type.interface';

export interface ServerConfig {
    port?: number;
    host?: string;
    debug?: boolean;
    autoStart?: boolean;
    startWs?: boolean;
    basePath?: string;
    middleware?: Function[];
    providers?: Type<any>[];
    routes: Type<any>[];
}
