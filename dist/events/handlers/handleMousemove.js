"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventType_1 = require("../../shared/constants/eventType");
var closestParent_1 = require("../../shared/util/closestParent");
function handleMousemove(pointerify, e) {
    var mouse = pointerify.mouse;
    var target = e.target;
    var isWithinRoot = Boolean(closestParent_1.default(target, pointerify.refs.root, true));
    if (mouse && !mouse.isStopping) {
        pointerify.movePointer(mouse, e, e);
    }
    else if (!mouse && isWithinRoot) {
        pointerify.emitStatic(e, eventType_1.default.POINTER_INSPECT);
    }
}
exports.default = handleMousemove;
//# sourceMappingURL=handleMousemove.js.map