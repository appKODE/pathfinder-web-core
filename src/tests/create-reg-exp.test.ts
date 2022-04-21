import { createTemplateRegExp } from '../utils/create-template-reg-exp';
import { endpointTemplate, endpointTemplateMatcher } from './mocks';

describe('getPath test', () => {
  it('should return correct result 1', () => {
    const result = createTemplateRegExp(endpointTemplate);
    expect(result).toEqual(endpointTemplateMatcher);
  });

  it('should return correct result 2', () => {
    const result = createTemplateRegExp('');
    expect(result).toEqual(/(?:)/gm);
  });
});
