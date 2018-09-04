"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Easing = require("./Constants/Easing");
var Physics = /** @class */ (function () {
    function Physics() {
        this.inertia = true;
        this.friction = 0.02;
        this.easing = Easing.EASE_OUT_CUBIC;
        Object.seal(this);
    }
    return Physics;
}());
exports.default = Physics;
//# sourceMappingURL=Physics.js.map