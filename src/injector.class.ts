import { Type } from './core/interfaces/internal/type.interface';

export class Injector {
    static cachedService = {};
    static resolve<T>(target: Type<any>, provided: Function[] = []): T {
        const tokens: Type<any>[] = Reflect.getMetadata('design:paramtypes', target) || [];
        if (tokens.includes(undefined)) {
            throw new Error('Circular Dependency');
        }
        if (provided.includes(target.constructor)) {
            throw new Error(target + ' is not provided!');
        }
        const injections = tokens.map(token => {
            return this.cachedService[token.name] || Injector.resolve<any>(token, provided);
        });
        this.cachedService[target.name] = new target(...injections);
        return this.cachedService[target.name];
    }
}
