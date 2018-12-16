import { BridgeError } from './bridge.error';

export class ResponseFactory {
    static result(result: any): any {
        return {
            error: false,
            errorMessage: '',
            data: result,
            timestamp: new Date().getTime().toString()
        };
    }
    static error(error: Error | BridgeError, res) {
        if (ResponseFactory.isBridgeError(error)) {
            res = res.status(error.statusCode);
        } else {
            res = res.status(500);
        }
        res.send({
            error: true,
            errorMessage: error.message,
            timestamp: new Date().getTime().toString()
        });
    }

    static isBridgeError(error): error is BridgeError {
        return (<BridgeError>error).statusCode !== undefined;
    }
}
