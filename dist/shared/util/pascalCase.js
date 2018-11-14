"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase_1 = require("./camelCase");
/**
 * Converts a camel, dash or snake-case string to pascal case.
 */
function pascalCase(str) {
    return (str = (str.match(/[_-]/) ? camelCase_1.default(str) : str))
        .charAt(0).toUpperCase() + str.slice(1);
}
exports.default = pascalCase;
//# sourceMappingURL=pascalCase.js.map