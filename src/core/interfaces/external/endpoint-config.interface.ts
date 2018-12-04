import { Type } from '../internal/type.interface';
import { CustomParamConfig } from '../../../interfaces/custom-param.interface';

export interface EndpointConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    route?: string;
    middleware?: Function[];
}

export interface EndpointConfigInternal extends EndpointConfig {
    parameterTypes: Type<any>[];
    parameterNames: string[];
    requiredParams: string[];
    serviceClass: string;
    customParams?: { [key: string]: CustomParamConfig };
}
