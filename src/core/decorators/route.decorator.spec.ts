import { Route } from './route.decorator';

class TestClass {}

describe('Route Decorator', () => {
    it('add a _bridge object', () => {
        const conFunc = Route({ basePath: '/' });
        conFunc(TestClass);
        const _bridge = TestClass.prototype['_bridge'];
        expect(_bridge).toBeDefined();
    });
    it('add a _bridge object with a config.basePath', () => {
        const conFunc = Route({ basePath: '/' });
        conFunc(TestClass);
        const _bridge = TestClass.prototype['_bridge'];
        expect(_bridge).toBeDefined();
        const config = _bridge['config'];
        expect(config).toBeDefined();
        expect(config.basePath).toBeDefined();
    });
});
