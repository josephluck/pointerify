"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType_1 = require("../../Shared/Constants/EventType");
var closestParent_1 = require("../../Shared/Util/closestParent");
function handleMousemove(pointerify, e) {
    var mouse = pointerify.mouse;
    var target = e.target;
    var isWithinRoot = Boolean(closestParent_1.default(target, pointerify.refs.root, true));
    if (mouse && !mouse.isStopping) {
        pointerify.movePointer(mouse, e, e);
    }
    else if (!mouse && isWithinRoot) {
        pointerify.emitStatic(e, EventType_1.default.POINTER_INSPECT);
    }
}
exports.default = handleMousemove;
//# sourceMappingURL=handleMousemove.js.map