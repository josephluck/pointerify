"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axis_1 = require("../Shared/Constants/Axis");
var Behavior = /** @class */ (function () {
    function Behavior() {
        this.pressDuration = 0;
        this.allowAxis = Axis_1.default.BOTH;
        this.clampAxis = Axis_1.default.NONE;
        this.pinch = true;
        Object.seal(this);
    }
    Object.defineProperty(Behavior.prototype, "allowX", {
        get: function () {
            return this.allowAxis === Axis_1.default.X || this.allowAxis === Axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Behavior.prototype, "allowY", {
        get: function () {
            return this.allowAxis === Axis_1.default.Y || this.allowAxis === Axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Behavior.prototype, "clampX", {
        get: function () {
            return this.clampAxis === Axis_1.default.X || this.clampAxis === Axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Behavior.prototype, "clampY", {
        get: function () {
            return this.clampAxis === Axis_1.default.Y || this.clampAxis === Axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    return Behavior;
}());
exports.default = Behavior;
//# sourceMappingURL=Behavior.js.map