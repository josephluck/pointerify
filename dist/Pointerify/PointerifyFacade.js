"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pointerify_1 = require("./Pointerify");
var PointerifyFacade = /** @class */ (function () {
    function PointerifyFacade(root, options) {
        var pointerify = new Pointerify_1.default(root, options);
        this.configure = pointerify.configure.bind(pointerify);
        this.destroy = pointerify.destroy.bind(pointerify);
        this.refresh = pointerify.refresh.bind(pointerify);
    }
    return PointerifyFacade;
}());
exports.default = PointerifyFacade;
//# sourceMappingURL=PointerifyFacade.js.map