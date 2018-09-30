import { Endpoint } from '../interfaces/endpoint.interface';
import { Route } from '../interfaces/route.interface';
import { generateEndpoint } from './generate-endpoint.function';
import { Type } from '../interfaces/type.interface';

export function generateService(route: Route, endpoints: Endpoint[]) {
    const endpointsTemplates = endpoints.map(endpoint => generateEndpoint(endpoint));
    const serviceName = route.config.name || route.constructorFunction.name;
    const requiredTypes: Type<any>[] = [];
    endpointsTemplates.forEach(epTemplate => {
        const filteredTypes = epTemplate.requiredTypes.filter(
            type => !['String', 'Boolean', 'Number', 'Array'].includes(type.constructor.name)
        );
        requiredTypes.push(...filteredTypes);
    });

    const template = `
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// Interfaces
import { ApiResponse } from './interfaces/api-response.interface';
${generateImports(requiredTypes)}
@Injectable()
export class ${serviceName}Service {
    constructor(private http: HttpClient) {}
    ${endpointsTemplates.map(endpoint => endpoint.template).join('\r\n\r\n    ')}
}
`;

    return { template, requiredTypes, serviceName };
}

function generateImports(imports: Type<any>[]) {
    const filteredImports = {};
    imports.forEach(interfaceImport => {
        filteredImports[interfaceImport.constructor.name] = interfaceImport;
    });
    return Object.keys(filteredImports)
        .map(key => {
            return `import { ${key} } from './interfaces/${key}.interface';`;
        })
        .join('\r\n');
}
