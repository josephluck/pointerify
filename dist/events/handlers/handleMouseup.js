"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleMouseup = function (pointerify, e) {
    if (!pointerify.mouse)
        return;
    pointerify.releasePointer(pointerify.mouse, e);
    e.preventDefault();
};
exports.default = handleMouseup;
//# sourceMappingURL=handleMouseup.js.map