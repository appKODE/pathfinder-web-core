import { DataUrl } from '../types';

export function createUrl(url: DataUrl): string {
  const result = [];

  if (url.baseUrl !== undefined) {
    result.push(url.baseUrl);
  }

  result.push(url.path);

  const query = url.query.toString();
  if (query.length) {
    result.push(`?${query}`);
  }

  if (url.fragment !== undefined) {
    result.push(`#${url.fragment}`);
  }

  return result.join('');
}
