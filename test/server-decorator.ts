import { Server } from '../src/decorators/server.decorator';
import { HttpServer } from 'src/server.class';

@Server({
    port: 3001,
    routes: []
})
class TestServer {}

describe('Server', () => {
    it('sould have the proper port', () => {
        const server = new TestServer();
        const httpServer: HttpServer = (server as any).server;
        expect(httpServer.config.port).toBe(3001);
    });
});
