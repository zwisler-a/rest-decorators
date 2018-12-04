import { Endpoint } from '../interfaces/internal/endpoint.interface';
import { Logger } from '../../logger.service';
import { typeCheck } from './typecheck.function';
import { CustomParamConfig } from '../../interfaces/custom-param.interface';

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

    [req.params, req.query, req.body].forEach(source => {
        if (Object.keys(source).length > ep.config.requiredParams.length) {
            error('To many parameters. Parameters should be ' + ep.config.requiredParams.join(', '));
        }
    });

    const suppliedParams = ep.config.parameterNames.map((param, index) => {
        return (
            req.body[param] ||
            req.params[param] ||
            req.query[param] ||
            req[(ep.config.customParams[param] || {} as any).paramSource] ||
            error('Missing parameter ' + param)
        );
    });

    suppliedParams.forEach((name, idx) => {
        if (!typeCheck(suppliedParams[idx], ep.config.parameterTypes[idx])) {
            error('Type missmatch: ' + name + ' should have properties ' + Object.keys(ep.config.parameterTypes[idx]));
        }
    });

    return suppliedParams;
}
