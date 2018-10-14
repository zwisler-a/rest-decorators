export interface ServerConfig {
    port?: number;
    host?: string;
    debug?: boolean;
    autoStart?: boolean;
    apiGenPath?: string;
    basePath?: string;
    middleware?: Function[];
}
