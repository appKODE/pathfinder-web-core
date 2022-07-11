import { createTemplateRegExp, findSpec } from '../utils';
import {
  endpointTemplate,
  endpointTemplateWithPathParam,
  endpointTemplateWithPathParamSearch,
  url,
  urlSearch,
  urlSpec,
  urlSpecWithPathParam,
  urlSpecWithPathParamSearch,
} from './mocks';

const matcher = createTemplateRegExp(endpointTemplate);
const matcherWithPathParam = createTemplateRegExp(
  endpointTemplateWithPathParam,
);
const matcherWithPathParamSearch = createTemplateRegExp(
  endpointTemplateWithPathParamSearch,
);

const matchers = new Map()
  .set(urlSpec, matcher)
  .set(urlSpecWithPathParam, matcherWithPathParam)
  .set(urlSpecWithPathParamSearch, matcherWithPathParamSearch);

describe('parseUrl test', () => {
  it('should return correct result', () => {
    const result = findSpec(matchers, 'GET', url);

    expect(result).toEqual(urlSpec);
  });

  it('should find correct spec for search', () => {
    const result = findSpec(matchers, 'GET', urlSearch);

    console.log('result', result);

    expect(result).toEqual(urlSpec);
  });
});
