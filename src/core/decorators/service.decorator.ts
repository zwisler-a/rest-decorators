import { Type } from '../interfaces/internal/type.interface';

export function Service() {
    return function(constructor: Type<any>) {};
}
