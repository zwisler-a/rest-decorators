import { Type } from '../interfaces/internal/type.interface';

export class Bridge {
    public static bootstrap(server: Type<any>) {
        if (server.prototype.server) {
            server.prototype.server.start();
        } else {
            throw new Error('No Bridge Server!');
        }
    }
}
