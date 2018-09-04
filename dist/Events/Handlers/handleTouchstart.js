"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointerType_1 = require("../../Shared/Constants/PointerType");
var closestParent_1 = require("../../Shared/Util/closestParent");
var handleTouchstart = function (pointerify, e) {
    var target = e.target;
    var handleSelector = pointerify.config.selectors.handle;
    var touchIds = null;
    for (var i = 0, touch = void 0; (touch = e.changedTouches[i]); i++) {
        var newId = touch.identifier;
        var didCancel = false;
        for (var activeId in pointerify.touches) {
            // If any active touches in this instance are stopping (i.e.
            // already released but moving via inertia), cancel them.
            var activePointer = null;
            if ((activePointer = pointerify.touches[activeId]).isStopping) {
                pointerify.cancelPointer(activePointer);
                didCancel = true;
            }
        }
        if (handleSelector && !closestParent_1.default(target, handleSelector, true))
            break;
        pointerify.setRootGeometry();
        if (pointerify.totalTouches < 2 && !pointerify.touches[newId]) {
            pointerify.touches[newId] = pointerify.createPointer(touch, PointerType_1.default.TOUCH, didCancel);
        }
    }
    if (!pointerify.config.behavior.pinch)
        return;
    touchIds = Object.keys(pointerify.touches);
    if (touchIds.length > 1 && !pointerify.virtual) {
        // Multiple touches exist, create a "virtual" pointer at the
        // midpoint
        e.preventDefault();
        pointerify.virtual = pointerify.createVirtualPointer(pointerify.touches[touchIds[0]], pointerify.touches[touchIds[1]]);
    }
};
exports.default = handleTouchstart;
//# sourceMappingURL=handleTouchstart.js.map