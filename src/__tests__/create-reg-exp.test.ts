import { createTemplateRegExp } from '../utils/create-template-reg-exp';
import { endpointTemplate, endpointTemplateMatcher } from '../__mocks__/mocks';

describe('getPath test', () => {
  it('should return correct result for normal endpoint template', () => {
    const result = createTemplateRegExp(endpointTemplate);
    expect(result).toEqual(endpointTemplateMatcher);
  });

  it('should return non match regexp for empty template', () => {
    const result = createTemplateRegExp('');
    expect(result).toEqual(/(?:)/gm);
  });
});
