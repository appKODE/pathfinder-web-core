import { getPath } from '../get-path';

const matcher = /\/user\/v2\/content/gm;
const endpoint = '/mocks/some/mock-server/6096726/user/v2/content';

const anotherMatcher = /\/user\/v2\/profile/gm;

describe('getPath test', () => {
  it('should return correct result', () => {
    const result = getPath(endpoint, matcher);
    expect(result).toEqual('/user/v2/content');
  });

  it('should return null', () => {
    const result = getPath(endpoint, anotherMatcher);
    expect(result).toEqual(null);
  });
});
