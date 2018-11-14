"use strict";
/**
 * Clamps a floating point number to within a provided range.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function clamp(float, min, max) {
    min = typeof min === 'number' ? min : 0;
    max = typeof max === 'number' ? max : 1;
    return Math.max(min, Math.min(max, float));
}
exports.default = clamp;
//# sourceMappingURL=clamp.js.map