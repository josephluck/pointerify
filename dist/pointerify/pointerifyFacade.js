"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointerify_1 = require("./pointerify");
var PointerifyFacade = /** @class */ (function () {
    function PointerifyFacade(root, options) {
        var pointerify = new pointerify_1.default(root, options);
        this.configure = pointerify.configure.bind(pointerify);
        this.destroy = pointerify.destroy.bind(pointerify);
        this.refresh = pointerify.refresh.bind(pointerify);
    }
    return PointerifyFacade;
}());
exports.default = PointerifyFacade;
//# sourceMappingURL=pointerifyFacade.js.map