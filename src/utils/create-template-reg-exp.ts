export function createTemplateRegExp(template: string): RegExp {
  const exp = template.replace(/{(\w*)}/gm, '(\\w*)');
  return new RegExp(exp, 'gm');
}
