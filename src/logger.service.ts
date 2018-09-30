class Log {
    public DEBUG = false;
    log(...args) {
        console.log('[LOG]', ...args);
    }
    debug(...args) {
        if (this.DEBUG) {
            console.log('[DEBUG]', ...args);
        }
    }
}

export const Logger = new Log();
