import { Type } from 'src/interfaces/type.interface';

export function Service() {
    return function(constructor: Type<any>) {};
}
