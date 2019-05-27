import NullSafety from '../src/null-safety';
import {
  msgForMapTest,
  //
} from './test-utils';

describe.skip('(!! check with eyes) types', () => {
  // return: string | null | undefined
  it('ref-comment', () => NullSafety.start('abcdefg').result());
  // return: null | undefined
  it('ref-comment', () => NullSafety.start(null).result());
  // return: null | undefined
  it('ref-comment', () => NullSafety.start(undefined).result());
});

describe('NullSafety.result(...)', () => {
  const cases = [
    'abcdefg',
    '',
    0,
    false,
    null,
    undefined,
    //
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
