import { LiveValueConfig } from "../interfaces/external/live-value-config.interface";

export function Live(config: LiveValueConfig): any {
    return function() {
        const cbs = [];
        const liveValue = {
            subscribe: (cb: Function) => {
                cbs.push(cb);
                return () => {
                    cbs.splice(cbs.indexOf(cb), 1);
                };
            },
            value: undefined,
            config
        };
        const desc = {
            set: function(value) {
                cbs.forEach(cb => cb(value));
                liveValue.value = value;
            },
            get: function() {
                return liveValue.value;
            },
            enumerable: true,
            configurable: true
        };
        // Pool.addLiveValue(liveValue);
        return desc;
    };
}
