"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPath = void 0;
function getPath(path, matcher) {
    const res = path.match(matcher);
    return res ? res?.[0] : null;
}
exports.getPath = getPath;
