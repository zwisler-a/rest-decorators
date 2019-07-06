import { BridgeError } from './bridge.error';
import { Service } from '../decorators/service.decorator';

@Service()
export class ResponseFactory {
    result(result: any): any {
        return {
            error: false,
            errorMessage: '',
            data: result,
            timestamp: new Date().getTime().toString()
        };
    }
    error(error: Error | BridgeError, res) {
        if ((<BridgeError>error).statusCode !== undefined) {
            res = res.status((<BridgeError>error).statusCode);
        } else {
            res = res.status(500);
        }
        res.send({
            error: true,
            errorMessage: error.message,
            timestamp: new Date().getTime().toString()
        });
    }
}
