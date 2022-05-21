import { FindSpecFn, UrlSpec } from '../types';

export const findSpec: FindSpecFn = (matchers, method, url) => {
  let result: UrlSpec | null = null;

  matchers.forEach((value, key) => {
    const match = url.match(value);

    if (match && key.method === method) {
      result = key;
    }
  });

  return result;
};
