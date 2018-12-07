import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { requestHandler } from './request-handler.factory';

describe('Requesthandler factory', () => {
    const ep: Endpoint = {
        method: () => {},
        config: {
            route: '/aaa',
            method: 'GET',
            parameterNames: [],
            requiredParams: [],
            customParams: {},
            parameterTypes: []
        }
    };

    const req = {
        params: {},
        query: {},
        body: {}
    };
    const res = {
        send: text => {},
        status: status => {
            return {
                send: (text): any => {
                    throw new Error('Status got called' + JSON.stringify(text));
                }
            };
        }
    };

    it('should call the get method', done => {
        ep.method = () => {
            return 'abc';
        };
        const handler = requestHandler(ep, { test: () => {} });

        res.send = text => {
            expect(text.data).toBe('abc');
            done();
        };
        handler(req, res);
    });

    it('should call the get method', done => {
        ep.method = () => {
            throw new Error();
        };
        const handler = requestHandler(ep, { test: () => {} });

        res.status = status => {
            expect(status).toBe(500);
            return {
                send: text => {
                    expect(text).toBeDefined();
                    done();
                }
            };
        };

        res.send = text => {
            return '';
        };
        handler(req, res);
    });
});
