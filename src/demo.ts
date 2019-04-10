import NullSafety from './null-safety';
import { JSDOM } from 'jsdom';

const htmlA = `
<html>
  <h1>this is page A</h1>
</html>
`;
const htmlB = `
<html>
  <h3>this is page B</h3>
</html>
`;

interface ITextFetched {
  isSucceeded: boolean;
  text: string;
}

const fetchTitle = (html: string): ITextFetched => {
  const doc = new JSDOM(html).window.document;
  const title = NullSafety.start(doc)
    .next(o => o.querySelector('h1'))
    .next(o => o.textContent);
  return {
    isSucceeded: title.result() != null,
    text: title.resultAlty('title-unfetched'),
  };
};

console.log(`title of pageA: ${fetchTitle(htmlA).text}`);
// title of pageA: this is page A

console.log(`title of pageB: ${fetchTitle(htmlB).text}`);
// title of pageB: title-unfetched
