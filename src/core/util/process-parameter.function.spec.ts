import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { processParamters } from './process-parameter.function';

describe('Process parameter', () => {
    const ep: Endpoint = {
        method: () => {},
        config: {
            parameterNames: ['a'],
            requiredParams: ['a'],
            customParams: {},
            parameterTypes: [String]
        }
    };

    it('should read the from params', () => {
        const req = { params: { a: 1 }, query: {}, body: {} };
        const sup = processParamters(ep, req);
        expect(sup[0]).toBe(1);
    });
    it('should read the from query', () => {
        const req = { params: {}, query: { a: 1 }, body: {} };
        const sup = processParamters(ep, req);
        expect(sup[0]).toBe(1);
    });
    it('should read the from body', () => {
        const req = { params: {}, query: {}, body: { a: 1 } };
        const sup = processParamters(ep, req);
        expect(sup[0]).toBe(1);
    });

    it('should read 0 the from body', () => {
        const req = { params: {}, query: {}, body: { a: 0 } };
        const sup = processParamters(ep, req);
        expect(sup[0]).toBe(0);
    });

    it('should throw an error on missing parameter', () => {
        const req = { params: {}, query: {}, body: {} };
        expect(() => {
            processParamters(ep, req);
        }).toThrow(new Error('Missing parameter a'));
    });
});
