"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var behavior_1 = require("./behavior");
var physics_1 = require("./physics");
var selectors_1 = require("./selectors");
var Config = /** @class */ (function () {
    function Config() {
        this.behavior = new behavior_1.default();
        this.physics = new physics_1.default();
        this.selectors = new selectors_1.default();
        Object.freeze(this);
    }
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=config.js.map