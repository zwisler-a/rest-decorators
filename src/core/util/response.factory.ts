import { BridgeError } from './bridge.error';

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
        if (this.isBridgeError(error)) {
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

    isBridgeError(error): error is BridgeError {
        return (<BridgeError>error).statusCode !== undefined;
    }
}
