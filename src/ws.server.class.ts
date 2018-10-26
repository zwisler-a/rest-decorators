import * as expressws from 'express-ws';

import { HttpServer } from './server.class';
import { Service } from './decorators/service.decorator';
import { Pool } from './class-pool.class';
import { LiveValueConfig } from './interfaces/live-value-config.interface';

@Service()
export class WsServer {
    app: any;
    constructor(private httpServer: HttpServer) {
        expressws(this.httpServer.app);
        this.app = this.httpServer.app;

        this.app.ws('/', (ws, req) => {
            ws.on('message', (msg: string) => {
                if (msg.startsWith('sub:')) {
                    this.subscribe(ws, msg.split(':')[1]);
                }
            });
        });
    }

    subscribe(ws, to) {
        const value = Pool.liveValues.find(lv => lv.config.path === to);
        if (value) {
            this.createUpdater(ws, value);
        } else {
            ws.send([to, 'unknown'].join(','));
        }
    }

    createUpdater(ws, lv: { subscribe: (val: any) => void; value: any; config: LiveValueConfig }) {
        lv.subscribe(val => {
            ws.send([lv.config.path, JSON.stringify(val)].join(','));
        });
        ws.send([lv.config.path, JSON.stringify(lv.value)].join(','));
    }
}
