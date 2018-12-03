import { LiveValueConfig } from './live-value-config.interface';

export class LiveValue {
    /** Returns a function which unsubscribes if it gets called */
    subscribe: (val: any) => Function;
    value: any;
    config: LiveValueConfig;
}
