import { Route } from './route.decorator';
import { Endpoint } from './endpoint.decorator';

class TestClass {
    private test() {}
}

describe('Endpoint Decorator', () => {
    it('add a _bridge object', () => {
        const methodFuc = Endpoint();
        methodFuc(TestClass, 'test', Object.getOwnPropertyDescriptor(TestClass.prototype, 'test'));
        const _bridge = TestClass.constructor.prototype['_bridge'];
        expect(_bridge).toBeDefined();
    });

    describe('_bridge', () => {
        let _bridge;
        beforeEach(() => {
            const methodFuc = Endpoint();
            methodFuc(TestClass, 'test', Object.getOwnPropertyDescriptor(TestClass.prototype, 'test'));
            _bridge = TestClass.constructor.prototype['_bridge'];
        });

        it('add a config with endpoints', () => {
            expect(_bridge.endpoints).toBeDefined();
            expect(_bridge.endpoints.length).toBeGreaterThan(0);
        });

        it('add a config.endpoint (value/config)', () => {
            expect(_bridge.endpoints[0].method).toBeDefined();
            expect(_bridge.endpoints[0].config).toBeDefined();
        });
    });
});
