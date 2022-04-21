import { DataUrl } from '../../types';
import { createUrl } from '../create-url';

const data1:DataUrl = {
  baseUrl: 'https://domain.dev', fragment: 'fragment', path: '/api/v1/users/1/', query: new URLSearchParams('group=admin'),
};
const data2:DataUrl = {
  baseUrl: 'https://domain.dev', fragment: '', path: '/api/v1/users/1/', query: new URLSearchParams('group=admin'),
};
const data3:DataUrl = {
  baseUrl: 'https://domain.dev',
  path: '/api/v1/users/1/',
  query: new URLSearchParams(),
};
const data4:DataUrl = {
  baseUrl: 'https://domain.dev', path: '', query: new URLSearchParams(),
};
const data5:DataUrl = {
  path: '/api/v1/users/1/', query: new URLSearchParams(),
};

describe('parseUrl test', () => {
  it('should return correct result', () => {
    const result = createUrl(data1);
    expect(result).toEqual('https://domain.dev/api/v1/users/1/?group=admin#fragment');
  });
  it('should return correct result', () => {
    const result = createUrl(data2);
    expect(result).toEqual('https://domain.dev/api/v1/users/1/?group=admin');
  });

  it('should return correct result', () => {
    const result = createUrl(data3);
    expect(result).toEqual('https://domain.dev/api/v1/users/1/');
  });

  it('should return correct result', () => {
    const result = createUrl(data4);
    expect(result).toEqual('https://domain.dev');
  });

  it('should return null', () => {
    const result = createUrl(data5);
    expect(result).toEqual(null);
  });
});
