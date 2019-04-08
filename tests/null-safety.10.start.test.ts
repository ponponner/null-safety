import NullSafety from '../src/null-safety';

const expectToBe = <TSource>(safety: NullSafety<TSource>, result: TSource) => {
  expect((safety as any).source).toBe(result);
  expect(safety.result()).toBe(result);
};

// ----------------------------------------------------------------------
// 値の保持、受渡し、ジェネリック型変数についてのテスト
// Notice:
// - ジェネリック型変数については目視で確認する。
// ----------------------------------------------------------------------
const getTitle = (source: any) => `contains and returns ${source}`;

// #各型に対するテスト
// NullSafety<string>
test(getTitle('abcdefg'), () => {
  const source = 'abcdefg';
  expectToBe(NullSafety.start(source), source);
});
// NullSafety<number>
test(getTitle('0123456789'), () => {
  const source = '0123456789';
  expectToBe(NullSafety.start(source), source);
});
// NullSafety<boolean>
test(getTitle(true), () => {
  const source = true;
  expectToBe(NullSafety.start(source), source);
});
// NullSafety<null>
test(getTitle(null), () => {
  const source = null;
  expectToBe(NullSafety.start(source), source);
});
// NullSafety<undefined>
test(getTitle(undefined), () => {
  const source = undefined;
  expectToBe(NullSafety.start(source), source);
});

// #`!value`などとしがちな値について、分岐でバグがないかテスト
// Notice: このケースでは、ジェネリック型変数の確認については不要。
test(getTitle(''), () => {
  const source = '';
  expectToBe(NullSafety.start(source), source);
});
test(getTitle(0), () => {
  const source = 0;
  expectToBe(NullSafety.start(source), source);
});
test(getTitle(false), () => {
  const source = false;
  expectToBe(NullSafety.start(source), source);
});
