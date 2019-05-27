import NullSafety from '../src/null-safety';
import { JSDOM } from 'jsdom';

describe('demo', () => {
  const titleForUnfetched = 'title-unfetched';
  const cases = [
    {
      name: 'succeed to querySelector',
      html: `
      <html>
        <h1>this is page A</h1>
      </html>
      `,
      expected: 'this is page A',
    },
    {
      name: 'fail to querySelector',
      html: `
      <html>
        <h3>this is page A</h3>
      </html>
      `,
      expected: titleForUnfetched,
    },
  ];

  for (const c of cases) {
    const source = c.html;
    const actual = NullSafety.start(source)
      .next(o => new JSDOM(o).window.document)
      .next(o => o.querySelector('h1'))
      .next(o => o.textContent)
      .resultAlty(titleForUnfetched);
    const expected = c.expected;
    test(c.name, () => expect(actual).toBe(expected));
  }
});
