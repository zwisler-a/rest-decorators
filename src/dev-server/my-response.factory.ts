import { BridgeError } from '../core/util/bridge.error';
import { ResponseFactory } from '../core/util/response.factory';

export class MyResponseFactory implements ResponseFactory {
    constructor(){
        console.log("myrs");
    }
    result(result: any) {
        throw new Error('Method not implemented.');
    }
    error(error: Error | BridgeError, res: any): void {
        throw new Error('Method not implemented.');
    }
}
