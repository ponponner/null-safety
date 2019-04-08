import NullSafety from '../src/null-safety';

const strNull = 'string-null';
const strUndefined = 'string-undefined';
const strAltResult = 'string-alt-result';

const expectToBe = <TSource>(safety: NullSafety<TSource>, result: TSource) => {
  expect((safety as any).source).toBe(result);
  expect(safety.result()).toBe(result);
};

const getter = (
  source: string | null | undefined
): string | null | undefined => {
  switch (source) {
    case strNull:
      return null;
    case strUndefined:
      return undefined;
    default:
      return source + '-gettered';
  }
};

// ----------------------------------------------------------------------
// Getter関数の適用およびジェネリック型変数についてのテスト
// Notice:
// - ジェネリック型変数については目視で確認する。
// ----------------------------------------------------------------------
(() => {
  const getTitle = (source: string) =>
    `getter maps ${source} to ${getter(source)}`;

  // #結果がNull-Like以外の値になる場合
  // o: string
  test(getTitle('abcdefg'), () => {
    const source = 'abcdefg';
    const safety = NullSafety.start(source).nextWithAny(o => getter(o));
    expectToBe(safety, getter(source));
  });
  // #結果がNull-Likeになる場合
  test(getTitle(strNull), () => {
    const source = strNull;
    const safety = NullSafety.start(source).nextWithAny(o => getter(o));
    expectToBe(safety, getter(source));
  });
  test(getTitle(strUndefined), () => {
    const source = strUndefined;
    const safety = NullSafety.start(source).nextWithAny(o => getter(o));
    expectToBe(safety, getter(source));
  });
  // #`!value`などとしがちな値について、分岐でバグがないかテスト
  // Notice: このケースでは、ジェネリック型変数の確認については不要。
  test(getTitle(''), () => {
    const source = '';
    const safety = NullSafety.start(source).nextWithAny(o => getter(o));
    expectToBe(safety, getter(source));
  });
})();

// ----------------------------------------------------------------------
// Getter関数をスキップしないことおよびジェネリック型変数についてのテスト
// Notice:
// - ジェネリック型変数については目視で確認する。
// ----------------------------------------------------------------------
(() => {
  const getTitle = (source: any, result: any) =>
    `source is Null-Like, but not skipped getter(source: ${source}, result: ${result})`;

  // o: string
  test(getTitle(null, getter(null)), () => {
    const source = null;
    const safety = NullSafety.start<string>(source).nextWithAny(o => getter(o));
    expectToBe(safety, getter(source));
  });
  // o: string
  test(getTitle(undefined, getter(undefined)), () => {
    const source = undefined;
    const safety = NullSafety.start<string>(source).nextWithAny(o => getter(o));
    expectToBe(safety, getter(source));
  });
})();

// ----------------------------------------------------------------------
// altResulの適用およびジェネリック型変数についてのテスト
// Notice:
// - ジェネリック型変数については目視で確認する。
// ----------------------------------------------------------------------
// #元の値がNull-Likeの場合
(() => {
  const getTitle = (source: any, result: any) =>
    `value for getter is Null-Like, but result is not altResult(source:${source}, result:${result})`;

  // o: string
  test(getTitle(null, getter(null)), () => {
    const source = null;
    const safety = NullSafety.start<string>(source) //
      .nextWithAny(o => getter(o), strAltResult);
    expectToBe(safety, getter(null));
  });
  test(getTitle(undefined, getter(undefined)), () => {
    const source = undefined;
    const safety = NullSafety.start<string>(source) //
      .nextWithAny(o => getter(o), strAltResult);
    expectToBe(safety, getter(undefined));
  });
})();

// #Getter関数から得られた値がNull-Likeの場合
(() => {
  const getTitle = (source: any, altResult: string) =>
    `value from getter is Null-Like, so result is altResult ` +
    `(source: ${source}, ` +
    `value from getter:${getter(source)}, ` +
    `altResult: ${altResult})`;

  // o: string
  test(getTitle(strNull, strAltResult), () => {
    const source = strNull;
    const altResult = strAltResult;
    const safety = NullSafety.start(source) //
      .nextWithAny(o => getter(o), altResult);
    expectToBe(safety, altResult);
  });
  // o: string
  test(getTitle(strUndefined, strAltResult), () => {
    const source = strUndefined;
    const altResult = strAltResult;
    const safety = NullSafety.start(source) //
      .nextWithAny(o => getter(o), altResult);
    expectToBe(safety, altResult);
  });
})();
