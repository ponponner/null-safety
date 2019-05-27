import NullSafety from '../src/null-safety';
import {
  msgForMapTest,
  stringForNull,
  stringForUndefined,
  stringForAltResult,
  mapToNullLikeable,
} from './test-utils';

describe.skip('(!! check with eyes) types', () => {
  const startEmpty = NullSafety.start('');
  // arg: string
  // return: NullSafety<string>
  it('ref-comment', () => startEmpty.next(o => o.length));
  it('ref-comment', () => startEmpty.next<string>(_ => null));
  it('ref-comment', () => startEmpty.next<string>(_ => undefined));
  it('ref-comment', () => startEmpty.next(_ => null as string | null));
  it('ref-comment', () =>
    startEmpty.next(_ => undefined as string | undefined));
  // return: NullSafety<null>
  it('ref-comment', () => startEmpty.next(_ => null));
  // return: NullSafety<undefined>
  it('ref-comment', () => startEmpty.next(_ => undefined));
});

describe('NullSafety.next(...)', () => {
  const getter = mapToNullLikeable;
  const cases = [
    // cases: maps to next-value
    ['abcdefg', getter('abcdefg')],
    ['', getter('')],
    [0, getter(0)],
    [false, getter(false)],
    [stringForNull, getter(stringForNull)],
    [stringForUndefined, getter(stringForUndefined)],
    // cases: skips mapping to next-value
    [null, null],
    [undefined, undefined],
  ];
  for (const c of cases) {
    const source = c[0];
    const actual = NullSafety.start(source)
      .next(getter)
      .result();
    const expected = c[1];
    it(msgForMapTest(source, expected), () => {
      expect(actual).toBe(expected);
    });
  }
});

describe('NullSafety.next(...) with altResult', () => {
  const getter = mapToNullLikeable;
  const altResult = stringForAltResult;
  const cases = [
    // cases: maps to altResult
    [stringForNull, altResult],
    [stringForUndefined, altResult],
    [null, altResult],
    [undefined, altResult],
    // cases: maps to not-altResult
    ['abcdefg', getter('abcdefg')],
    ['', getter('')],
    [0, getter(0)],
    [false, getter(false)],
  ];
  for (const c of cases) {
    const source = c[0];
    const actual = NullSafety.start(source)
      .next(getter, altResult)
      .result();
    const expected = c[1];
    it(msgForMapTest(source, expected), () => {
      expect(actual).toBe(expected);
    });
  }
});
