"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = [
    'mousedown',
    'touchstart',
    'click',
    'mousemove',
    {
        target: window,
        type: 'mousemove'
    },
    {
        target: window,
        type: 'touchmove'
    },
    {
        target: window,
        type: 'mouseup'
    },
    {
        target: window,
        type: 'touchend'
    },
    {
        target: window,
        type: 'resize',
        debounce: 100,
        passive: true
    }
];
exports.default = events;
//# sourceMappingURL=events.js.map