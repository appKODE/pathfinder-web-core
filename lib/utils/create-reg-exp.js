"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateRegExp = void 0;
function createTemplateRegExp(template) {
    const exp = template.replace(/{(\w*)}/gm, '(\\w*)');
    return new RegExp(exp, 'gm');
}
exports.createTemplateRegExp = createTemplateRegExp;
