"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointerifyFacade_1 = require("./PointerifyFacade");
function pointerifyFactory(root, config) {
    if (config === void 0) { config = {}; }
    if (!(root instanceof HTMLElement)) {
        throw new TypeError('[Pointerify] Invalid element provided');
    }
    return new PointerifyFacade_1.default(root, config);
}
exports.default = pointerifyFactory;
//# sourceMappingURL=pointerifyFactory.js.map