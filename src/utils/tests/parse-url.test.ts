import { DataUrl } from '../../types';
import { parseUrl } from '../parse-url';

const url = 'https://domain.dev/api/v1/users/1/?group=admin#fragment';

const correctResult:DataUrl = {
  baseUrl: 'https://domain.dev', fragment: 'fragment', path: '/api/v1/users/1/', query: new URLSearchParams('group=admin'),
};

describe('parseUrl test', () => {
  it('should return correct result', () => {
    const result = parseUrl(url);
    expect(result).toEqual(correctResult);
  });

  it('should return null', () => {
    const result = parseUrl('url.dev');
    expect(result).toEqual(null);
  });

  it('should return null', () => {
    const result = parseUrl('');
    expect(result).toEqual(null);
  });
});
