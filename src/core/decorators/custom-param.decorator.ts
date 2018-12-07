import { CustomParamConfig } from '../../interfaces/custom-param.interface';
import "reflect-metadata";
/**
 * Used to retieve a value inside the express request object.
 * @example
 * private myFunction(@CusomParam('url') url) {}
 *
 * @param from Where the parameter is from. Does a req[from]
 */
export function CustomParam(from: string) {
    return function(target: Object, propertyKey: string, parameterIndex: number) {
        const existingRequiredParameters: CustomParamConfig[] =
            Reflect.getOwnMetadata('customParam', target, propertyKey) || [];
        existingRequiredParameters.push({ index: parameterIndex, paramSource: from });
        Reflect.defineMetadata('customParam', existingRequiredParameters, target, propertyKey);
    };
}
