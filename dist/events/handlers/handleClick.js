"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleClick = function (pointerify, e) {
    if (pointerify.isClicking)
        return;
    e.preventDefault();
    e.stopPropagation();
};
exports.default = handleClick;
//# sourceMappingURL=handleClick.js.map