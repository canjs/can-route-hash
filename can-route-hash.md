@module {RouteHash} can-route-hash
@parent can-routing
@collection can-infrastructure

@description An observable that is cross bound to the window.location.hash.

@type {RouteHash}

The `can-route-hash` package exports a `RouteHash` constructor function.  Instances of
`RouteHash` are two-way bound to the `window.location.hash` once the instances have a listener.

```js
import { RouteHash, Reflect } from "can";

var routeHash = new RouteHash();

window.location.hash = "#!foo";

// bind
Reflect.onValue( routeHash, function(){});

window.location.hash = "#!bar";

routeHash.value //-> "bar"

routeHash.value = "zed";

window.location.hash = "#!zed";
```

As shown above, instances of `RouteHash` support `.value` to get and set values. Also,
instances of `RouteHash` implement the common  `ValueObservable` symbols:

- [can-reflect.getValue] - `canReflect.getValue( routeHash )`
- [can-reflect.setValue] - `canReflect.setValue( routeHash, "foo=bar" )`
- [can-reflect/observe.onValue] - `canReflect.onValue( routeHash, handler(newValue, oldValue) )`
- [can-reflect/observe.offValue] - `canReflect.offValue( routeHash, handler )`



@body
