---
title: Filter and Includes
description: filter() and includes() may need a lot of help from you.
---

```ts
const arrayWithNulls = [1, 2, null];
// filter is a type guard = needs to explictly know how to remove the union
const stillHasNulls: number[] = arrayWithNulls.filter((x) => !!x);
const withoutNulls: number[] = arrayWithNulls.filter(
  (x): x is number => x !== null,
);

// since this is tedious, and boolean cast wipes out 0 and "" anyway:
const filterNulls = Array.prototype.filter((item) => item != null);
const noNulls: number[] = arrayWithNulls.filter(filterNulls);
```
