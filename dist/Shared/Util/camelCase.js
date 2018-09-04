"use strict";
/**
 * Converts a dash or snake-case string to camel case.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function camelCase(str) {
    return str.toLowerCase()
        .replace(/([_-][a-z0-9])/g, function ($1) { return $1.toUpperCase().replace(/[_-]/, ''); });
}
exports.default = camelCase;
//# sourceMappingURL=camelCase.js.map