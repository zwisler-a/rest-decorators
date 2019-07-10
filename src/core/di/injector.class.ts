import 'reflect-metadata';

import { Type } from '../interfaces/internal/type.interface';
import { OverwriteProvider, ProvidedClass, ProvidedValue, Provider } from './provider.type';

export class Injector {
    cachedService = {};
    providers: Provider[] = [];

    constructor(providers: Provider[] = []) {
        this.providers = providers.concat();
        this.providers.push(Injector);
        this.cachedService[Injector.name] = this;
    }

    resolve<T>(target: Type<any>): T {
        const tokens: Type<any>[] = Reflect.getMetadata('design:paramtypes', target) || [];
        if (tokens.includes(undefined)) {
            throw new Error('Circular Dependency');
        }

        const getInjection = (token: Type<any>) => {
            // Get Provider from provided array
            const possibleProviders = this.providers.filter(
                provider => provider == token || (OverwriteProvider.isInstance(provider) && provider.provide == token)
            );
            if (!possibleProviders.length)
                throw new Error("Can't resolve " + target.name + ' dependency ' + token.name + ' is not provided');
            const provider = possibleProviders.find(provider => OverwriteProvider.isInstance(provider)) || possibleProviders[0];
            if (OverwriteProvider.isInstance(provider)) {
                if (ProvidedValue.isInstance(provider)) {
                    return provider.useValue;
                } else if (ProvidedClass.isInstance(provider)) {
                    return this.cachedService[provider.useClass.name] || this.resolve<any>(provider.useClass);
                }
            } else {
                return this.cachedService[token.name] || this.resolve<any>(token);
            }
        };
        const injections = tokens.map(token => getInjection(token));
        this.cachedService[target.name] = new target(...injections);
        return this.cachedService[target.name];
    }

    add(provider: Provider) {
        this.providers.push(provider);
    }

    addInstance(token: Type<any>, instance: any) {
        this.providers.push(token);
        this.cachedService[token.name] = instance;
    }
}
