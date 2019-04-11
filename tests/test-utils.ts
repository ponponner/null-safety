import { inspect } from 'util';

export const stringForNull = 'string-for-null';
export const stringForUndefined = 'string-for-undefined';
export const stringForAltResult = 'alt-result';

export const msgForMapTest = (source: any, expected: any) => {
  const length = 25;
  const stringSource = inspect(source).padEnd(length);
  const stringResult = inspect(expected).padEnd(length);
  return `maps ${stringSource} to ${stringResult}`;
};
export const mapToNullLikeable = <TSource>(
  o: TSource
): string | null | undefined => {
  const s = o + '';
  switch (s) {
    case stringForNull:
      return null;
    case stringForUndefined:
      return undefined;
    default:
      return `${o}-mapped`;
  }
};
