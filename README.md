
<br />

<div align="center">
  <img  src="./docs/image.png" />
  <h3 align="center">Typescript decorators</h3>
  <br>
  <p align="center">
    REST-Server using Typescript decorators
  </p>
</div>
<br />

# Typescript decorators

<img  src="./docs/preview.png"/>
<div align="center">
 Typescript - Decorators - IoC - Dependency Injection
</div>
<br>

An adaption of the express framework working with typescript decorators.
Implements dependency injection to help structure a server created with it.
(A way worse version of nestjs)

## Example Code

```ts
@Route({
    basePath: '/foo'
})
export class BarRoute {

    // Automaticlly sind websockets events when
    // the property gets updated
    @Live({ path: 'live' }) 
    public liveData;

    // Expose REST-Endpoint
    @Endpoint()
    foo() {return "bar";}
}

@Server({
    routes: [BarRoute],
    providers: [FooService]
})
class MyServer {}

Brige.bootstrap(MyServer);
```
