import { Type } from '../internal/type.interface';
import { CustomParamConfig } from '../internal/custom-param.interface';

export interface EndpointConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    route?: string;
    middleware?: Function[];
}

export interface EndpointConfigInternal extends EndpointConfig {
    parameterTypes: Type<any>[];
    parameterNames: string[];
    requiredParams: string[];
    customParams?: { [key: string]: CustomParamConfig };
}
