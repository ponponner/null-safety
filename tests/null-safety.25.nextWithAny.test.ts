import { NullSafety } from '../src/null-safety';
import {
  msgForMapTest,
  stringForNull,
  stringForUndefined,
  stringForAltResult,
  mapToNullLikeable,
} from './test-utils';

describe.skip('(!! check with eyes) types', () => {
  const start0 = NullSafety.start(0);
  // arg: string | null | undefined
  // return: NullSafety<string>
  it('ref-comment', () => NullSafety.start('abcdefg').nextWithAny(o => o));
  it('ref-comment', () => start0.nextWithAny<string>(_ => null));
  it('ref-comment', () => start0.nextWithAny<string>(_ => undefined));
  it('ref-comment', () => start0.nextWithAny(_ => null as string | null));
  it('ref-comment', () =>
    start0.nextWithAny(_ => undefined as string | undefined));
  // return: NullSafety<null>
  it('ref-comment', () => start0.nextWithAny(_ => null));
  // return: NullSafety<undefined>
  it('ref-comment', () => start0.nextWithAny(_ => undefined));
});

describe('NullSafety.nextWithAny(...)', () => {
  const getter = mapToNullLikeable;
  const cases = [
    // cases: maps to next-value
    ['abcdefg', getter('abcdefg')],
    ['', getter('')],
    [0, getter(0)],
    [false, getter(false)],
    [stringForNull, getter(stringForNull)],
    [stringForUndefined, getter(stringForUndefined)],
    // cases: maps to next-value(don't skip mapping)
    [null, getter(null)],
    [undefined, getter(undefined)],
  ];
  for (const c of cases) {
    const source = c[0];
    const actual = NullSafety.start(source)
      .nextWithAny(getter)
      .result();
    const expected = c[1];
    it(msgForMapTest(source, expected), () => {
      expect(actual).toBe(expected);
    });
  }
});

describe('NullSafety.nextWithAny(...) with altResult', () => {
  const getter = mapToNullLikeable;
  const altResult = stringForAltResult;
  const cases = [
    // cases: maps to altResult
    [stringForNull, stringForAltResult],
    [stringForUndefined, stringForAltResult],
    // cases: maps to not-altResult
    [null, getter(null)],
    [undefined, getter(undefined)],
    ['abcdefg', getter('abcdefg')],
    ['', getter('')],
    [0, getter(0)],
    [false, getter(false)],
  ];
  for (const c of cases) {
    const source = c[0];
    const actual = NullSafety.start(source)
      .nextWithAny(getter, altResult)
      .result();
    const expected = c[1];
    it(msgForMapTest(source, expected), () => {
      expect(actual).toBe(expected);
    });
  }
});
