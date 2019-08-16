import { Server } from '..';
import { Bridge } from '../core/public_api';
import { ResponseFactory } from '../core/util/response.factory';
import { WsModule } from '../ws/public_api';
import { Api1 } from './api1.route';
import { MyResponseFactory } from './my-response.factory';
import { TestInitResolver } from './test.resolver';
import { Service1 } from './test.service';

@Server({
    debug: true,
    routes: [Api1],
    imports: [WsModule],
    providers: [Service1],
    resolve: TestInitResolver,
    fallbackResponse: (req, res) => {
        res.send('fallback');
    },
    middleware: [
        (req, res, next) => {
            console.log('server');
            next();
        }
    ]
})
class TestServer {}

Bridge.bootstrap(TestServer);
