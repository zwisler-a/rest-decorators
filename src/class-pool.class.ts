import { Route } from './interfaces/route.interface';
import { Endpoint } from './interfaces/endpoint.interface';
import { LiveValueConfig } from './interfaces/live-value-config.interface';
import { LiveValue } from './interfaces/live-value.interface';

export class Pool {
    static routes: Route[] = [];
    static addRoute(route: Route) {
        this.routes.push(route);
    }

    static endpoints: Endpoint[] = [];
    static addEndpoint(ep: Endpoint) {
        this.endpoints.push(ep);
    }

    static liveValues: LiveValue[] = [];
    static addLiveValue(liveValue: LiveValue): any {
        this.liveValues.push(liveValue);
    }
}
