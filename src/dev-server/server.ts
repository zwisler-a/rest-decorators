import 'reflect-metadata';
import { Server } from '../index';
import { Api1 } from './api1.route';
import { Service1 } from './test.service';
import { Brige } from '../core/public_api';
import { WsModule } from '../ws/public_api';

@Server({
    debug: true,
    routes: [Api1],
    imports: [WsModule],
    providers: [Service1],
    middleware: [
        (req, res, next) => {
            console.log('server');
            next();
        }
    ]
})
class TestServer {}

Brige.bootstrap(TestServer);
