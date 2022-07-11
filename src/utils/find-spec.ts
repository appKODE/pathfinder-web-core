import { FindSpecFn, UrlSpec } from '../types';

export const findSpec: FindSpecFn = (matchers, method, url) => {
  let result: UrlSpec | null = null;

  const { pathname } = new URL(url);

  const pathnameChunks = pathname.split('/').length;

  matchers.forEach((value, matcher) => {
    const templateChunks = matcher.template.split('/').length;

    const match = url.match(value);

    if (
      match &&
      matcher.method === method &&
      templateChunks === pathnameChunks
    ) {
      result = matcher;
    }
  });

  return result;
};
