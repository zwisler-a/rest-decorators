export class ResponseFactory {
    static result(result: any): any {
        return {
            error: false,
            errorMessage: '',
            data: result,
            timestamp: new Date().getTime().toString()
        };
    }
    static error(message, data?) {
        return {
            error: true,
            data,
            errorMessage: message,
            timestamp: new Date().getTime().toString()
        };
    }
}
