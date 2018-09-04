"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Behavior_1 = require("./Behavior");
var Physics_1 = require("./Physics");
var Selectors_1 = require("./Selectors");
var Config = /** @class */ (function () {
    function Config() {
        this.behavior = new Behavior_1.default();
        this.physics = new Physics_1.default();
        this.selectors = new Selectors_1.default();
        Object.freeze(this);
    }
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=Config.js.map