import { Service } from "../decorators/service.decorator";

@Service()
export class Service1 {
    log(log) {
        console.log(log);
    }
}
