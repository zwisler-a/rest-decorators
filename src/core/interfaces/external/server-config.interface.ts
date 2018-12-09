import { Type } from '../internal/type.interface';

export interface ServerConfig {
    /** Application port */
    port?: number;
    /** Where to start the application, defaults to 127.0.0.1  */
    host?: string;
    /** log debug messages */
    debug?: boolean;
    /** Path of the static file serve */
    staticPath?: string | string[];
    /** If the websocket server should start */
    startWs?: boolean;
    /** global api prefix */
    basePath?: string;
    /** middlewares the server uses */
    middleware?: Function[];
    /** Services registered on the Server */
    providers?: Type<any>[];
    /** Routes registered on the server */
    routes: Type<any>[];
}
