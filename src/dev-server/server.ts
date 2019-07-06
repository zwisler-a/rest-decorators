import { Server } from '..';
import { INIT_DATA } from '../core/interfaces/external/init-data.token';
import { Bridge } from '../core/public_api';
import { WsModule } from '../ws/public_api';
import { Api1 } from './api1.route';
import { TestInitResolver } from './test.resolver';
import { Service1 } from './test.service';

@Server({
    debug: true,
    routes: [Api1],
    imports: [WsModule],
    providers: [Service1],
    resolve: TestInitResolver,
    middleware: [
        (req, res, next) => {
            console.log('server');
            next();
        }
    ]
})
class TestServer {
}

Bridge.bootstrap(TestServer);
