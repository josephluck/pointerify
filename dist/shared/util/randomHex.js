"use strict";
/**
 * Returns a random hex string
 */
Object.defineProperty(exports, "__esModule", { value: true });
function randomHex() {
    // tslint:disable:no-bitwise
    return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
}
exports.default = randomHex;
//# sourceMappingURL=randomHex.js.map