"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointerType_1 = require("../Shared/Constants/PointerType");
var PointerStateDynamic = /** @class */ (function () {
    function PointerStateDynamic() {
        this.id = '';
        this.deltaX = -1;
        this.deltaY = -1;
        this.deltaDistance = -1;
        this.deltaMultiplierX = -1;
        this.deltaMultiplierY = -1;
        this.deltaMultiplierDistance = -1;
        this.multiplierX = -1;
        this.multiplierY = -1;
        this.velocityX = -1;
        this.velocityY = -1;
        this.velocityPinch = -1;
        this.directionX = null;
        this.directionY = null;
        this.directionPinch = null;
        this.status = null;
        this.type = null;
    }
    Object.defineProperty(PointerStateDynamic.prototype, "isMousePointer", {
        get: function () {
            return this.type === PointerType_1.default.MOUSE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerStateDynamic.prototype, "isTouchPointer", {
        get: function () {
            return this.type === PointerType_1.default.TOUCH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerStateDynamic.prototype, "isVirtualPointer", {
        get: function () {
            return this.type === PointerType_1.default.VIRTUAL;
        },
        enumerable: true,
        configurable: true
    });
    return PointerStateDynamic;
}());
exports.default = PointerStateDynamic;
//# sourceMappingURL=PointerStateDynamic.js.map