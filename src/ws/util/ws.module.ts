import { Module } from '../../core/decorators/module.decorator';
import { Injector } from '../../injector.class';
import { WsServer } from './ws.server.class';

@Module()
export class WsModule {
    constructor() {
        Injector.resolve<WsServer>(WsServer);
    }
}
