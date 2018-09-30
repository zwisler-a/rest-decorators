import { Server } from '../decorators/server.decorator';
import { Route } from '../decorators/route.decorator';
import { Endpoint } from '../decorators/endpoint.decorator';
import { CustomParam } from '../decorators/custom-param.decorator';
import { expressServer } from '../server.class';

@Route({ basePath: '/tests' })
class Api1 {
    @Endpoint()
    test() {
        return true;
    }
    @Endpoint()
    test2(param) {
        return param;
    }
    @Endpoint()
    test3(param: string): string {
        return param;
    }
    @Endpoint()
    test4(param: string, @CustomParam('url') url): string {
        console.log(url);
        return url;
    }
}

@Server({ debug: true })
class TestServer {
    constructor() {
        expressServer.register(Api1);
    }
}
