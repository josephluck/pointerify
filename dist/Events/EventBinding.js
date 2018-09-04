"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBinding = /** @class */ (function () {
    function EventBinding(eventBindingRaw) {
        this.type = '';
        this.target = null;
        this.debounce = 0;
        this.handler = null;
        this.passive = false;
        if (typeof eventBindingRaw === 'string') {
            this.type = eventBindingRaw;
        }
        else {
            Object.assign(this, eventBindingRaw);
        }
        Object.seal(this);
    }
    EventBinding.prototype.unbind = function () {
        this.target.removeEventListener(this.type, this.handler);
    };
    return EventBinding;
}());
exports.default = EventBinding;
//# sourceMappingURL=EventBinding.js.map