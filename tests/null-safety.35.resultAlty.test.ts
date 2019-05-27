import NullSafety from '../src/null-safety';
import {
  msgForMapTest,
  stringForAltResult,
  //
} from './test-utils';

describe.skip('(!! check with eyes) types', () => {
  const altResult = stringForAltResult;
  // return: string | null | undefined
  it('ref-comment', () => NullSafety.start('abcdefg').resultAlty(altResult));
  // return: null
  it('ref-comment', () => expect(NullSafety.start(null).resultAlty(null)));
  // return: undefined
  it('ref-comment', () =>
    expect(NullSafety.start(undefined).resultAlty(undefined)));
});

describe('NullSafety.result(...)', () => {
  const altResult = stringForAltResult;
  const cases = [
    ['abcdefg', 'abcdefg'],
    ['', ''],
    [0, 0],
    [false, false],
    [null, altResult],
    [undefined, altResult],
    //
  ];
  for (const c of cases) {
    const source = c[0];
    const actual = NullSafety.start(source).resultAlty(altResult);
    const expected = c[1];
    it(msgForMapTest(source, expected), () => {
      expect(actual).toBe(expected);
    });
  }
});
