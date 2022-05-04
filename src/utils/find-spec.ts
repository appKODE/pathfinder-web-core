import { UrlSpec } from '../types';

export const findSpec = (
  matchers: Map<UrlSpec, RegExp>,
  method: string,
  url: string,
): UrlSpec | null => {
  let result: UrlSpec | null = null;

  matchers.forEach((value, key) => {
    const match = url.match(value);

    if (match && key.method === method) {
      result = key;
    }
  });

  return result;
};
