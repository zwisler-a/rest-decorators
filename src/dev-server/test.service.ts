import { Service } from "../core/decorators/service.decorator";

@Service()
export class Service1 {
    log(log) {
        console.log(log);
    }
}
