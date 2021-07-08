---
title: The Never Type
description: Where did this `never[]` come from?
---

The `never` type is what's left after all other possibilities have been [narrowed down](/docs/narrowing). This most commonly happens when a function throws an error, or when if/else/switch/case runs out of options and hits an `else` or `default` case.

```ts twoslash
function fn(x: string | number): string {
  if (typeof x === "string") {
    return x;
  } else if (typeof x === "number") {
    return x.toString();
  }
  // We've narrowed out string and number, so all that's left is never
  return x;
}
```

Functions which throw will always have a `never` return type.

```ts twoslash
function fail(msg: string) {
  throw new Error(msg);
}
```

The other time you'll see `never` when it's really a symptom of another error. Here's a case where a type is expecting an object, but we give it an array:

```ts twoslash
// @errors: 2739
type Resolver = {
  location: { city: string; state: string };
};

const resolver: Resolver = {
  location: [],
};
```

## References

[https://www.typescriptlang.org/docs/handbook/basic-types.html#never](Never Type)
