export function createTemplateRegExp(template: string): RegExp {
  console.log('template', template);
  const exp = template.replace(/{(\w*)}/gm, '(\\w*)'); // replace \w* to  special symbol

  console.log('exp', exp);
  return new RegExp(exp, 'gm');
}
