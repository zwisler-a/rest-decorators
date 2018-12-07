import { registerEndpoint } from './register-endpoint.function';
import { Endpoint } from '../interfaces/internal/endpoint.interface';

describe('Register endpoint', () => {
    const ep: Endpoint = {
        method: () => {},
        config: {
            route: '/aaa',
            method: 'GET',
            parameterNames: ['a'],
            requiredParams: ['a'],
            customParams: {},
            parameterTypes: [String]
        }
    };

    it('should call the get method', () => {
        const route = {
            get: (path, ...middlewares) => {
                expect(path).toBe('/aaa');
                expect(middlewares.length).toBe(1);
            }
        };
        registerEndpoint(route, ep, null);
    });
});
