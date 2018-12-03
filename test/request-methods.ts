import * as fetch from 'node-fetch';
import { Server } from '../src/decorators/server.decorator';
import { Route } from '../src/decorators/route.decorator';
import { Endpoint } from '../src/decorators/endpoint.decorator';

@Route({ basePath: '/route' })
class TestRoute {
    @Endpoint()
    test() {
        return 'test';
    }

    @Endpoint({ method: 'POST', route: 'test' })
    test2() {
        return 'test';
    }
    @Endpoint({ method: 'PUT', route: 'test' })
    test3() {
        return 'test';
    }
    @Endpoint({ method: 'DELETE', route: 'test' })
    test4() {
        return 'test';
    }
}

@Server({
    port: 3001,
    routes: [TestRoute]
})
class TestServer {}

describe('Request methods', () => {
    it('make a get request to /router/test', async () => {
        const response = await (await fetch('http://localhost:3001/route/test')).json();
        expect(response.data).toBe('test');
    });
    it('make a post request to /router/test', async () => {
        const response = await (await fetch('http://localhost:3001/route/test', { method: 'POST' })).json();
        expect(response.data).toBe('test');
    });
    it('make a put request to /router/test', async () => {
        const response = await (await fetch('http://localhost:3001/route/test', { method: 'PUT' })).json();
        expect(response.data).toBe('test');
    });
    it('make a delete request to /router/test', async () => {
        const response = await (await fetch('http://localhost:3001/route/test', { method: 'DELETE' })).json();
        expect(response.data).toBe('test');
    });
});
