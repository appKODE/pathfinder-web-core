import { createTemplateRegExp } from '../create-template-reg-exp';

const template = '/user/v2/content';
const templateMatcher = /\/user\/v2\/content/gm;

describe('getPath test', () => {
  it('should return correct result', () => {
    const result = createTemplateRegExp(template);
    expect(result).toEqual(templateMatcher);
  });

  it('should return correct result', () => {
    const result = createTemplateRegExp('');
    expect(result).toEqual(/(?:)/gm);
  });
});
