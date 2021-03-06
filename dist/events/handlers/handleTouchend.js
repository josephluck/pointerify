"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointer_1 = require("../../pointer/pointer");
var handleTouchend = function (pointerify, e) {
    if (pointerify.totalTouches < 1)
        return;
    for (var i = 0, touch = void 0; (touch = e.changedTouches[i]); i++) {
        var id = touch.identifier;
        var pointer = null;
        if (!((pointer = pointerify.touches[id]) instanceof pointer_1.default))
            break;
        pointerify.releasePointer(pointer, touch);
        e.preventDefault();
    }
};
exports.default = handleTouchend;
//# sourceMappingURL=handleTouchend.js.map