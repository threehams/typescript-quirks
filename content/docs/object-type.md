---
title: The `Object`, `object` and `{}` types
description: How do you type "any plain old JS object" in TypeScript without shutting off the type system entirely?
---

How do you type "any object" for a function? For instance, a tracking function for Google Analytics which can accept any plain old object:

```ts
const track = (data: any) => {
  window.ga("send", "event", data);
};
```

### The `Object` type

Let's start with `Object`. This represents the type for the global `Object` class. Using this just leads to strange behavior:

```ts twoslash
// @errors: 2345
const track = (data: Object) => {};

track(true); // why is this OK?
track(""); // or this?
track(null);
```

There are no good uses for `Object` in normal application code; on larger projects, use the [ban-types lint rule](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md) to prevent it from causing problems.

### The `object` type

The `object` type is a strange one - it represents any non-primitive type, including functions and arrays.

```ts twoslash
// @errors: 2345
const track = (data: object) => {};

track(true); // Better
track({});
track([]); // arrays are allowed!
track(() => {}); // and functions!
```

Because of limited use, the `object` type is also flagged by default by the [ban-types lint rule](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md) to prevent it from causing problems.

### The empty interface `{}`

How about just using `{}`? It allows extra keys, but it doesn't behave like you'd expect:

```ts twoslash
// @errors: 2345
const track = (data: object) => {};

track(true);
track(null);
track({});
track({ user: "dave" });
track([]); // arrays are still allowed!
track(() => {}); // and functions!
```

Empty interfaces behave even more strangely as properties of objects:

```ts twoslash
interface Data {
  empty: {};
}

const data: Data = {
  empty: true, // no error here, but clearly wrong
};
```

This behavior is just a quirk of the language which can't be fixed without

Once again, empty types are flagged by default by [ban-types](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md).

### What do we really want here?

For our `track` function, we want to accept a plain JS object, but we don't care about what the values are. We can do this with an index signature: `{[key: string]: unknown }`.

```ts twoslash
// @errors: 2345
const track = (data: { [key: string]: unknown }) => {};

track({}); // Object literal: OK!

// Everything else is an error!
track(true);
track(null);
track([]);
track(() => {});
```

### Allowing empty objects only

Occasionally, you may need to specify that something is an empty object, but don't want this strange behavior. For instance, you have a server that returns `{}`:

```ts twoslash
export type Response = {
  data: {};
};

const response: Response = {
  data: {},
};
const invalidResponse: Response = {
  data: { extra: "property" },
};
const reallyInvalidResponse: Response = {
  data: true,
};
```

Because of the strange behavior of `{}`, this can be better represented with `{ [key: string]: undefined }`:

```ts twoslash
// @errors: 2322
export type Response = {
  data: { [key: string]: undefined };
};

const response: Response = {
  data: {},
};
const invalidResponse: Response = {
  data: { extra: "property" },
};
const reallyInvalidResponse: Response = {
  data: true,
};
```
