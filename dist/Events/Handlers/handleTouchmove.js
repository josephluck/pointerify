"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pointer_1 = require("../../Pointer/Pointer");
var handleTouchmove = function (pointerify, e) {
    if (pointerify.totalTouches < 1)
        return;
    for (var i = 0, touch = void 0; (touch = e.changedTouches[i]); i++) {
        var id = touch.identifier;
        var pointer = null;
        if (!((pointer = pointerify.touches[id]) instanceof Pointer_1.default) || pointer.isStopping)
            break;
        pointerify.movePointer(pointer, touch, e);
    }
};
exports.default = handleTouchmove;
//# sourceMappingURL=handleTouchmove.js.map