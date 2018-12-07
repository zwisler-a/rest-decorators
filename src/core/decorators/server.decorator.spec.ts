import { Server } from './server.decorator';

class TestClass {}

describe('Server Decorator', () => {
    it('add a server object', () => {
        const conFunc = Server({ routes: [] });
        conFunc(TestClass);
        const server = TestClass.prototype['server'];
        expect(server).toBeDefined();
        const config = server['config'];
        expect(config).toBeDefined();
        expect(config.port).toBeDefined();
        expect(config.routes).toBeDefined();
    });

    it('add a config object', ()=>{
        const conFunc = Server({ routes: [] });
        conFunc(TestClass);
        const server = TestClass.prototype['server'];
        const config = server['config'];
        expect(config).toBeDefined();
        expect(config.routes).toBeDefined();
    })

    it('add a config object with default values', ()=>{
        const conFunc = Server({ routes: [] });
        conFunc(TestClass);
        const server = TestClass.prototype['server'];
        const config = server['config'];
        expect(config).toBeDefined();
        expect(config.routes).toBeDefined();
        expect(config.port).toBeDefined();
    })
});
