import { Resolve } from '../core/public_api';

export class TestInitResolver implements Resolve {
    async resolve(): Promise<any> {
        return { a: 'a' };
    }
}
