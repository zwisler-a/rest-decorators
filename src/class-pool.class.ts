import { Route } from './interfaces/route.interface';
import { Endpoint } from './interfaces/endpoint.interface';
import { LiveValueConfig } from './interfaces/live-value-config.interface';

export class Pool {
    static routes: Route[] = [];
    static addRoute(route: Route) {
        this.routes.push(route);
    }

    static endpoints: Endpoint[] = [];
    static addEndpoint(ep: Endpoint) {
        this.endpoints.push(ep);
    }

    static liveValues: { subscribe: (val: any) => void; value: any; config: LiveValueConfig }[] = [];
    static addLiveValue(liveValue: { subscribe: (val: any) => void; value: any; config: LiveValueConfig }): any {
        this.liveValues.push(liveValue);
    }
}
