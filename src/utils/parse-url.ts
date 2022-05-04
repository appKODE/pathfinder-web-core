import { DataUrl } from '../types';

export function parseUrl(val: string): DataUrl | null {
  const match = val.match(
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
  );

  if (match) {
    const path = match[5];

    if (!path) {
      return null;
    }

    const url: DataUrl = {
      path,
      query: new URLSearchParams(match[7]),
    };

    const scheme = match[2];
    const host = match[4];

    if (!scheme || !host) {
      return null;
    }

    url.baseUrl = `${scheme}://${host}`;

    const fragment = match[9];
    if (fragment) {
      url.fragment = fragment;
    }
    return url;
  }
  return null;
}
