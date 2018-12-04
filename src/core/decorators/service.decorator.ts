import { Type } from 'src/core/interfaces/internal/type.interface';

export function Service() {
    return function(constructor: Type<any>) {};
}
