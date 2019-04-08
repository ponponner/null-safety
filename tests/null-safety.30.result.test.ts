import NullSafety from '../src/null-safety';

// ----------------------------------------------------------------------
// 値の取得、（ジェネリック型変数を処理した結果である）戻り値型についてのテスト
// Notice:
// - 戻り値の型については目視で確認する。
// ----------------------------------------------------------------------
const getTitle = (source: any) => `returns ${source}`;

// 戻り値の型: string | null | undefined
test(getTitle('abcdefg'), () => {
  const source = 'abcdefg';
  expect(NullSafety.start(source).result()).toBe(source);
});
// 戻り値の型: null | undefined
test(getTitle(null), () => {
  const source = null;
  expect(NullSafety.start(source).result()).toBe(source);
});
// 戻り値の型: null | undefined
test(getTitle(undefined), () => {
  const source = undefined;
  expect(NullSafety.start(source).result()).toBe(source);
});
