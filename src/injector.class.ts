import { Type } from './interfaces/type.interface';

export class Injector {
    static cachedService = {};
    static resolve<T>(target: Type<any>): T {
        const tokens: Type<any>[] = Reflect.getMetadata('design:paramtypes', target) || [];
        if (tokens.includes(undefined)) {
            throw new Error('Circular Dependency');
        }
        const injections = tokens.map(token => {
            return this.cachedService[token.name] || Injector.resolve<any>(token);
        });
        this.cachedService[target.name] = new target(...injections);
        return this.cachedService[target.name];
    }
}
