"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axis_1 = require("../shared/constants/axis");
var Behavior = /** @class */ (function () {
    function Behavior() {
        this.pressDuration = 0;
        this.allowAxis = axis_1.default.BOTH;
        this.clampAxis = axis_1.default.NONE;
        this.pinch = true;
        Object.seal(this);
    }
    Object.defineProperty(Behavior.prototype, "allowX", {
        get: function () {
            return this.allowAxis === axis_1.default.X || this.allowAxis === axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Behavior.prototype, "allowY", {
        get: function () {
            return this.allowAxis === axis_1.default.Y || this.allowAxis === axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Behavior.prototype, "clampX", {
        get: function () {
            return this.clampAxis === axis_1.default.X || this.clampAxis === axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Behavior.prototype, "clampY", {
        get: function () {
            return this.clampAxis === axis_1.default.Y || this.clampAxis === axis_1.default.BOTH;
        },
        enumerable: true,
        configurable: true
    });
    return Behavior;
}());
exports.default = Behavior;
//# sourceMappingURL=behavior.js.map