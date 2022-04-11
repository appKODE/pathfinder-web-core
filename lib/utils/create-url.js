"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrl = void 0;
function createUrl(url) {
    const result = [];
    if (url.baseUrl !== undefined) {
        result.push(url.baseUrl);
    }
    result.push(url.path);
    const query = url.query.toString();
    if (query.length) {
        result.push(`?${query}`);
    }
    if (url.fragment !== undefined) {
        result.push(`#${url.fragment}`);
    }
    return result.join('');
}
exports.createUrl = createUrl;
