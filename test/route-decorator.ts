import { Route } from '../src/decorators/route.decorator';
import { Pool } from '../src/class-pool.class';

@Route({ basePath: '' })
class TestRoute {}

describe('Route', () => {
    it('should add itself to the classpool', () => {
        expect(Pool.routes.length).toBe(1);
    });
});
