"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointerType_1 = require("../../shared/constants/pointerType");
var closestParent_1 = require("../../shared/util/closestParent");
var handleMousedown = function (pointerify, e) {
    var target = e.target;
    var handleSelector = pointerify.config.selectors.handle;
    var didCancel = false;
    if (e.button !== 0)
        return;
    if (pointerify.mouse) {
        pointerify.cancelPointer(pointerify.mouse);
        didCancel = true;
    }
    if (handleSelector && !closestParent_1.default(target, handleSelector, true))
        return;
    pointerify.setRootGeometry();
    pointerify.mouse = pointerify.createPointer(e, pointerType_1.default.MOUSE, didCancel);
    e.preventDefault();
};
exports.default = handleMousedown;
//# sourceMappingURL=handleMousedown.js.map