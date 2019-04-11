import { NullSafety } from '../src/null-safety';
import { msgForMapTest } from './test-utils';

describe.skip('(!! check with eyes) types', () => {
  // return: NullSafety<string>
  it('ref-comment', () => NullSafety.start('abcdefg'));
  it('ref-comment', () => NullSafety.start<string>(null));
  it('ref-comment', () => NullSafety.start<string>(undefined));
  it('ref-comment', () => NullSafety.start(null as string | null));
  it('ref-comment', () => NullSafety.start(undefined as string | undefined));
  // return: NullSafety<null>
  it('ref-comment', () => NullSafety.start(null));
  // return: NullSafety<undefined>
  it('ref-comment', () => NullSafety.start(undefined));
});

describe('NullSafety.start(...)', () => {
  const cases = [
    // cases: not-NullLike
    'abcdefg',
    '',
    0,
    false,
    // cases: NullLike
    null,
    undefined,
  ];
  for (const c of cases) {
    const source = c;
    const actual = NullSafety.start(source).result();
    const expected = c;
    it(msgForMapTest(source, expected), () => {
      expect(actual).toBe(expected);
    });
  }
});
