import { Module } from '../../core/decorators/module.decorator';
import { Injector } from '../../core/di/injector.class';
import { WsServer } from './ws.server.class';

@Module()
export class WsModule {
    constructor(private injector: Injector) {
        this.injector.resolve<WsServer>(WsServer);
    }
}
