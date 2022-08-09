import { UrlSpec } from '../types';
import { findSpec } from '../utils';

export const specSimple: UrlSpec = {
  id: 'get-user-content',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/content',
};

export const specWithPathParam: UrlSpec = {
  id: 'get-with-path-aram',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/customers/{customerId}',
};

export const specWithWithPathParamSearch: UrlSpec = {
  id: 'get-with-path-path-param-search',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/customers/search/{q}',
};
const specWithSeparatedPathParam: UrlSpec = {
  id: 'get-with-path-path-param-search-separated',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: '/user/v2/customers/search/separated/{query-string1}',
};

const templatesBySpec = new Map()
  .set(
    specWithSeparatedPathParam,
    '/user/v2/customers/search/separated/{query-string1}',
  )
  .set(specWithWithPathParamSearch, '/user/v2/customers/search/{q}')
  .set(specSimple, '/user/v2/content')
  .set(specWithPathParam, '/user/v2/customers/{customerId}');

describe('parseUrl test', () => {
  it('test specSimple', () => {
    const result = findSpec(
      templatesBySpec,
      'GET',
      'https://domain.dev/user/v2/content/?group=admin#fragment',
    );

    expect(result).toEqual(specSimple);
  });

  it('test specWithPathParam', () => {
    const result = findSpec(
      templatesBySpec,
      'GET',
      'https://domain.dev/user/v2/customers/some-path-param/?page=1&pageSize=3',
    );

    expect(result).toEqual(specWithPathParam);
  });

  it('test specWithPathParamSearch', () => {
    const result = findSpec(
      templatesBySpec,
      'GET',
      'https://domain.dev/user/v2/customers/search/some-search-query/?page=1&pageSize=3',
    );

    expect(result).toEqual(specWithWithPathParamSearch);
  });

  it('test specWithSeparatedPathParam', () => {
    const result = findSpec(
      templatesBySpec,
      'GET',
      'https://domain.dev/user/v2/customers/search/separated/some-search-query/?page=1&pageSize=3',
    );

    expect(result).toEqual(specWithSeparatedPathParam);
  });
});
