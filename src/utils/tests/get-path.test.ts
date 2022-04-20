import { getPath } from '../get-path';

const matcher = new RegExp('');

describe('getPath test', () => {
  it('should return correct path', () => {
    const path = getPath('https://somedomain.dev/api/v1/users/2/?group=admin', matcher);

    console.log('path', path);

    expect(path).toEqual('/profile/1/exits/2');
  });
});
