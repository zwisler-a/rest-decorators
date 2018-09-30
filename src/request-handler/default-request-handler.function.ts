import { Endpoint } from '../interfaces/endpoint.interface';

export function defaultRequestHandler(app, endpoints: Endpoint[]) {
    app.use((req, res) => {
        res.status(500).send(
            'Available endpoints: \r\n' +
                endpoints
                    .map(ep => {
                        return {
                            url: [ep.route.config.basePath, ep.config.route].join('/'),
                            parameter: ep.config.requiredParams.map((name, idx) => {
                                return name + ':' + ep.config.parameterTypes[idx].constructor.name;
                            })
                        };
                    })
                    .map(ep => {
                        return ep.url + '\r\n-' + ep.parameter.join('\r\n-');
                    })
        );
    });
}
