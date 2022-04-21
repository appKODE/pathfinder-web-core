import { createTemplateRegExp, findSpec } from '../utils';
import { endpointTemplate, url, urlSpec } from './mocks';

const matcher = createTemplateRegExp(endpointTemplate);

const matchers = new Map().set(urlSpec, matcher);

describe('parseUrl test', () => {
  it('should return correct result', () => {
    const result = findSpec(matchers, 'GET', url);

    expect(result).toEqual(urlSpec);
  });
});
