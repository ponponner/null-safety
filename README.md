## null-safety

[![CircleCI](https://circleci.com/gh/ponponner/null-safety.svg?style=svg)](https://circleci.com/gh/ponponner/null-safety)

## example：

```ts:demo.ts
const html = `
<html>
  <h1>this is a title</h1>
</html>
`;

const doc = new JSDOM(html).window.document;

const title = NullSafety.start(doc)
  .next(o => o.querySelector('h1'))
  .next(o => o.textContent)
  .resultAlty('title-for-failed');

console.log(title);
// output: this is a title
```

## type-safety：

```ts
const title = NullSafety.start(doc)

  .next(o => o.querySelector('h1'))
  // return: HTMLHeadingElement | null

  .next(o => o.textContent)
  // argument: HTMLHeadingElement (not nullable *>_<)b!
  // return:   string | null

  .resultAlty('title-for-failed');
  // return: string (not nullable *>_<)b!
```

## recommendation:

Use TypeScript & TypeScript compiler option: `strictNullChecks`(or `strict`)

```json:tsconfig.json
{
  "compilerOptions": {
    "strictNullChecks": true,
  }
}

// or

{
  "compilerOptions": {
    "strict": true,
  }
}
```
