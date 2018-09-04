"use strict";
/**
 * Returns a function which calls the provided function
 * only after the specified interval has elapsed between
 * function calls. An optional `immediate` boolean will
 * cause the provided function to be called once immediately
 * before waiting.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function debounce(fn, interval, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeoutId = null;
    return function () {
        var _this = this;
        var args = arguments;
        var later = function () {
            timeoutId = null;
            fn.apply(_this, args);
        };
        if (timeoutId === null && immediate) {
            later();
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, interval);
    };
}
exports.default = debounce;
//# sourceMappingURL=debounce.js.map