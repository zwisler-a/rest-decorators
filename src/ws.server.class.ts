import * as expressws from 'express-ws';

import { HttpServer } from './core/util/server.class';
import { Service } from './core/decorators/service.decorator';
import { LiveValueConfig } from './interfaces/live-value-config.interface';
import { LiveValue } from './interfaces/live-value.interface';

@Service()
export class WsServer {
    app: any;
    constructor(private httpServer: HttpServer) {
        expressws(this.httpServer.app);
        this.app = this.httpServer.app;

        this.app.ws('/', (ws, req) => {
            let unsubscribe;
            ws.on('message', (msg: string) => {
                if (msg.startsWith('sub:') && !unsubscribe) {
                    unsubscribe = this.subscribe(ws, msg.split(':')[1]);
                }
            });
            ws.on('close', function close() {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
        });
    }

    subscribe(ws, to) {
        /* const value = Pool.liveValues.find(lv => lv.config.path === to);
        if (value) {
            return this.createUpdater(ws, value);
        } else {
            ws.send([to, 'unknown'].join(','));
        } */
    }

    createUpdater(ws, lv: LiveValue) {
        ws.send([lv.config.path, JSON.stringify(lv.value)].join(','));
        return lv.subscribe(val => {
            ws.send([lv.config.path, JSON.stringify(val)].join(','));
        });
    }
}
