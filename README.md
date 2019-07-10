# Bridge

## Introduction

Typescript decorators for a simple 'rest' api.
Nothing fancy yet, more or less for personal use.
Includes slefmade dependency injection.
Used for personal projects. For a proper framework try nestjs


## Example Code

```ts
@Route({
    basePath: '/tests'
})
export class Api1 {
    @Endpoint()
    test() {}
}

@Server({
    debug: true,
    routes: [Api1],
    providers: [Service1]
})
class TestServer {}

Brige.bootstrap(TestServer);
```
