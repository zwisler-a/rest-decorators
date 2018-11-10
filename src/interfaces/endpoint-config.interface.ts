import { Type } from './type.interface';
import { CustomParamConfig } from './custom-param.interface';

export interface EndpointConfig {
    method?: 'GET' | 'POST';
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
