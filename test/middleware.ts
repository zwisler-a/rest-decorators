import * as fetch from 'node-fetch';
import { Server } from '../src/decorators/server.decorator';
import { Route } from '../src/decorators/route.decorator';
import { Endpoint } from '../src/decorators/endpoint.decorator';

@Route({
    basePath: '/route',
    middleware: [
        (req, res, next) => {
            if (!req.url.includes('endpoint')) {
                res.send('route');
            } else {
                next();
            }
        }
    ]
})
class TestRoute {
    @Endpoint({
        middleware: [
            (req, res, next) => {
                res.send('endpoint');
            }
        ]
    })
    endpoint() {}

    @Endpoint()
    ap() {}
}

@Server({
    port: 3002,
    middleware: [
        (req, res, next) => {
            if (!req.url.includes('route') && !req.url.includes('endpoint')) {
                res.send('server');
            } else {
                next();
            }
        }
    ],
    routes: [TestRoute]
})
class TestServer {}

describe('Middleware', () => {
    it('should respond from endpoint', async () => {
        const response = await (await fetch('http://localhost:3002/route/endpoint')).text();
        expect(response).toBe('endpoint');
    });
    it('should respond from route', async () => {
        // ap since it needs an endpoint to actually target
        const response = await (await fetch('http://localhost:3002/route/ap')).text();
        expect(response).toBe('route');
    });
    it('should respond from server', async () => {
        const response = await (await fetch('http://localhost:3002')).text();
        expect(response).toBe('server');
    });
});
