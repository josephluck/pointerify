"use strict";
/**
 * Returns the closest parent of a given element matching the
 * provided selector, optionally including the element itself.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isTarget(target, selectorOrParent) {
    if (typeof selectorOrParent === 'string') {
        return target.matches(selectorOrParent);
    }
    return target === selectorOrParent;
}
function closestParent(el, selectorOrParent, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    var parent = el.parentNode;
    if (includeSelf && isTarget(el, selectorOrParent)) {
        return el;
    }
    while (parent && parent !== document.body) {
        if (parent.matches && isTarget(parent, selectorOrParent)) {
            return parent;
        }
        else if (parent.parentNode) {
            parent = parent.parentNode;
        }
        else {
            return null;
        }
    }
    return null;
}
exports.default = closestParent;
//# sourceMappingURL=closestParent.js.map