import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { typeCheck } from './typecheck.function';

/**
 * Sorts through the parameters given in a request to find errors and
 * puts together an Array to contain all params for a function
 * @param ep Endpoint the request targets
 * @param req Request object express
 */
export function processParamters(ep: Endpoint, req) {
    const error = err => {
        throw new Error(err);
    };

    const defined = val => typeof val !== 'undefined';

    [req.params, req.query, req.body].forEach(source => {
        if (Object.keys(source).length > ep.config.requiredParams.length) {
            error('To many parameters. Parameters should be ' + ep.config.requiredParams.join(', '));
        }
    });

    const suppliedParams = ep.config.parameterNames.map((param, index) => {
        if (defined(req.body[param])) return req.body[param];
        if (defined(req.params[param])) return req.params[param];
        if (defined(req.query[param])) return req.query[param];
        const customParam = (ep.config.customParams[param] || ({} as any)).paramSource;
        if (defined(req[customParam])) return req[customParam];

        error('Missing parameter ' + param);
    });

    suppliedParams.forEach((name, idx) => {
        if (!typeCheck(suppliedParams[idx], ep.config.parameterTypes[idx])) {
            error('Type missmatch: ' + name + ' should have properties ' + Object.keys(ep.config.parameterTypes[idx]));
        }
    });

    return suppliedParams;
}
