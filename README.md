# Bridge

## Introduction
Typescript decorators for a simple 'rest' api.
Nothing fancy yet, more or less for personal use.

## Decorators

### Server
Class decorator

Decorator to bootstrap the server, define the routes and services.

### Service
Class decorator

Service used inside the application

### Route
Class decorator

A rest api route

### Endpoint
Method decorator

A rest api endpoint


## WS not yet done

```ts

@Route({
    basePath: '/tests',
    middleware: [
        (req, res, next) => {
            console.log('Service');
            next();
        }
    ]
})
export class Api1 {
    @Endpoint()
    test(){}
}

@Server({
    debug: true,
    routes: [Api1],
    startWs: true,
    providers: [Service1],
    middleware: [
        (req, res, next) => {
            console.log('server');
            next();
        }
    ]
})
class TestServer {}

Brige.bootstrap(TestServer);
```
