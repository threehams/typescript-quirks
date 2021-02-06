---
title: Type Narrowing
description: Understand common quirks of narrowing in TypeScript, such as removing null or undefined as possibilities.
---

To narrow a type is to take a union, such as `string | null`, and remove one or more types from it.

By example:

```ts twoslash
const getName = (name: string | null) => {
  if (name) {
    return name; // this is now "string"
  }
  name; // this is now "null"
  return "";
};
```

## Related Issues

https://github.com/Microsoft/TypeScript/issues/10938#issuecomment-247476364
https://github.com/microsoft/TypeScript/issues/20195
https://twitter.com/kentcdodds/status/1081333326290415618

## Where Narrowing is Lost

go over "I narrowed and it widened my type in a callback"
https://github.com/Microsoft/TypeScript/issues/9998

tl;dr rules for avoiding this:

1. never reassign parameters. https://eslint.org/docs/rules/no-param-reassign
2. use `const` unless you need `let` (enable the prefer-const eslint rule)

```ts twoslash
// @errors: 2531
const thing: string = "thing";
if (thing === "thing") {
  thing;
}

const maybeAsync = (callback: () => void) => {
  callback();
};

const getLengthWithReassign = (item: string | null) => {
  // reassigning a parameter marks it as "mutable"
  // assuming that this can change at any time is just a performance /
  // complexity tradeoff in TypeScript
  item = ""; // comment out this line to remove error
  item.length; // OK
  maybeAsync(() => {
    item.length;
  });
};
```

if you don't have to deal with null, default values work well

```ts twoslash
// @errors: 2304

const maybeAsync = (callback: () => void) => {
  callback();
};

const getLengthWithDefault = (item: string = "") => {
  item.length;
  maybeAsync(() => {
    item.length;
  });
};
getLengthWithDefault(undefined);
```

```ts twoslash
// @errors: 2304
const maybeAsync = (callback: () => void) => {
  callback();
};

const getLength = (item: string | null) => {
  if (!item) {
    return 0;
  }
  item.length; // OK
  maybeAsync(() => {
    item.length;
  });
};
```

```ts twoslash
// @errors: 2454
const maybeAsync = (callback: () => void) => {
  callback();
};

const myFunc = (active: boolean) => {
  let className: string;
  if (active) {
    className = "active";
  } else {
    // className = "disabled";
    // return;
  }
  className.length;
  maybeAsync(() => {
    className.length;
  });
  return;
};
```
