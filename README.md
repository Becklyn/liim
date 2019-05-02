Liim
====

A tiny service container.

One of the goals is for `liim` to be as small and fast as possible. It is not supposed to include all possible features. If you need to enhance it with additional features, you can extend the instance and add the functionality on top.

Right now it is ~380B minifed and ~230B gzipped.


Usage
-----


### Registering Services

Create the service container:

```js
import Liim from "liim";

let liim = new Liim();
```

A service can either be any value or a function which will create the dependency:

```js
liim.set("hello", new MyService);

// create the service lazily
liim.set("ohai", (liim) => {
    return new ServiceWithDependencies(liim.get("a"), liim.get("b"));
});
```

Services with a service factory function will only be created when the service is fetched for the first time. Also they will only be created once, as the instance is reused.


### Fetching Services

You can get services using the `.get()` method:

```js
liim.get("service-name");
```

This method will throw if the service is missing. If the service is an optional requirement
for your app, you should check on existence with

```js
if (liim.has("serice-name"))
{
    // service is defined
}
```

beforehand.

