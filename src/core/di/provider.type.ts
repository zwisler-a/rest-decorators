import { Type } from '../interfaces/internal/type.interface';

export abstract class OverwriteProvider {
    provide: Type<any>;

    static isInstance(object: any): object is OverwriteProvider {
        return object.provide != undefined;
    }
}

export class ProvidedValue extends OverwriteProvider {
    useValue: any;

    static isInstance(object: any): object is ProvidedValue {
        return OverwriteProvider.isInstance(object) && object['useValue'] != undefined;
    }
}
export class ProvidedClass extends OverwriteProvider {
    useClass: Type<any>;

    static isInstance(object: any): object is ProvidedClass {
        return OverwriteProvider.isInstance(object) && object['useClass'] != undefined;
    }
}
export type Provider = Type<any> | ProvidedValue | ProvidedClass;
