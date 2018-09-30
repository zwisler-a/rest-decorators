import { Endpoint } from '../interfaces/endpoint.interface';
import { Type } from '../interfaces/type.interface';

export function generateEndpoint(endpoint: Endpoint) {
    const requiredTypes: Type<any>[] = [];
    let returnTypeString = 'any';
    if (endpoint.config.returnType) {
        requiredTypes.push(endpoint.config.returnType);
        returnTypeString = endpoint.config.returnType.constructor.name;
    }
    requiredTypes.push(...endpoint.config.parameterTypes);
    const parametes = endpoint.config.requiredParams.map((param, idx) => {
        return `${param}: ${endpoint.config.parameterTypes[idx].constructor.name}`;
    });

    const url = [endpoint.route.config.basePath, endpoint.config.route].join('/');
    const template = `public ${endpoint.config.route}(${parametes.join(', ')}) {
        return this.http['${endpoint.config.method.toLocaleLowerCase()}']<ApiResponse<${returnTypeString}>>(
            ${endpoint.config.method.toLocaleLowerCase() === 'get' ? urlParams(url, endpoint) : bodyParams(url, endpoint)}
        ).pipe(
            map(val => val.data)
        );
    }`;

    return { template, requiredTypes };
}

function urlParams(url: string, ep: Endpoint) {
    return `'${url}',
            {
                params: new HttpParams()${ep.config.requiredParams
            .map(param => {
                return `.set('${param}', ${param}.toString())`;
            })
            .join('\r\n\t\t')}
            }`;
}

function bodyParams(url: string, ep: Endpoint) {
    return `'${url}',
            {${ep.config.requiredParams.join(', ')}}`;
}
