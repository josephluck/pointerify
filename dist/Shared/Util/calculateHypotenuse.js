"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the distance between two grid coordindates.
 */
function calculateHypotenuse(nodeA, nodeB) {
    var squareOfsideX = Math.pow(Math.abs(nodeA.x - nodeB.x), 2);
    var squareOfSideY = Math.pow(Math.abs(nodeA.y - nodeB.y), 2);
    return Math.sqrt(squareOfsideX + squareOfSideY);
}
exports.default = calculateHypotenuse;
//# sourceMappingURL=calculateHypotenuse.js.map