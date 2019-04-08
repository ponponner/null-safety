import NullSafety from '../src/null-safety';

const strAltResult = 'string-alt-result';

// ----------------------------------------------------------------------
// 値の取得、（ジェネリック型変数を処理した結果である）戻り値型についてのテスト
// Notice:
// - 戻り値の型については目視で確認する。
// ----------------------------------------------------------------------
// 元の値がNull-Likeでない場合
(() => {
  const getTitle = (source: any) => `returns ${source}`;

  // 戻り値の型: string
  test(getTitle('abcdefg'), () => {
    const source = 'abcdefg';
    expect(NullSafety.start(source).resultAlty(strAltResult)).toBe(source);
  });
})();

// 元の値がNull-Likeの場合
(() => {
  const getTitle = (source: any, result: any) =>
    `source is Null-Like, so returns altResult(source: ${source}, result: ${result})`;

  // 戻り値の型: string
  test(getTitle(null, strAltResult), () => {
    const source = null;
    const altResult = strAltResult;
    const result = NullSafety.start<string>(source).resultAlty(altResult);
    expect(result).toBe(altResult);
  });
  // 戻り値の型: string
  test(getTitle(undefined, strAltResult), () => {
    const source = undefined;
    const altResult = strAltResult;
    const result = NullSafety.start<string>(source).resultAlty(altResult);
    expect(result).toBe(altResult);
  });
})();
