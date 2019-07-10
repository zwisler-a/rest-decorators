import { Service } from '../core/decorators/service.decorator';
import { Resolve } from '../core/interfaces/external/resolve.interface';

@Service()
export class Service1 {
    resolve(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    log(log) {
        console.log(log);
    }
}
