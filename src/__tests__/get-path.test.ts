import { getPath } from '../utils';
import {
  anotherEndpointTemplateMatcher,
  endpointTemplate,
  endpointTemplateMatcher,
  url,
} from '../__mocks__/mocks';

describe('getPath test', () => {
  it('should return correct result', () => {
    const result = getPath(url, endpointTemplateMatcher);
    expect(result).toEqual(endpointTemplate);
  });

  it('should return null', () => {
    const result = getPath(url, anotherEndpointTemplateMatcher);
    expect(result).toEqual(null);
  });
});
