"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = void 0;
function parseUrl(val) {
    const match = val.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
    if (match) {
        const path = match[5];
        if (!path) {
            throw new Error('Invalid URL');
        }
        const url = {
            path,
            query: new URLSearchParams(match[7]),
        };
        const scheme = match[2];
        const host = match[4];
        if (scheme && host) {
            url.baseUrl = `${scheme}://${host}`;
        }
        const fragment = match[9];
        if (fragment) {
            url.fragment = fragment;
        }
        return url;
    }
    return null;
}
exports.parseUrl = parseUrl;
