import { Type } from '../internal/type.interface';
import { Resolve } from './resolve.interface';
import { Provider } from '../../di/provider.type';

export interface ServerConfig {
    /** Application port */
    port?: number;
    /** Where to start the application, defaults to 127.0.0.1  */
    host?: string;
    /** log debug messages */
    debug?: boolean;
    /** Path of the static file serve */
    staticPath?: string | string[];
    /** Modules that should be imported */
    imports?: Type<any>[];
    /** global api prefix */
    basePath?: string;
    /** middlewares the server uses */
    middleware?: Function[];
    /** Services registered on the Server */
    providers?: Provider[];
    /** Routes registered on the server */
    routes: Type<any>[];
    /** Gets called on startup. Server starts when the Promise returned by resolve is resolved. Data returned in the promise is provided in INIT_DATA */
    resolve?: Type<Resolve>;
}
