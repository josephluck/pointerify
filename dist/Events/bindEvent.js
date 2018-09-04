"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = require("../Shared/Util/debounce");
var pascalCase_1 = require("../Shared/Util/pascalCase");
var EventBinding_1 = require("./EventBinding");
function bindEvent(context, defaultTarget, eventBindingRaw) {
    var eventBinding = new EventBinding_1.default(eventBindingRaw);
    if (!eventBinding.target)
        eventBinding.target = defaultTarget;
    var handlerName = "handle" + pascalCase_1.default(eventBinding.type);
    var handler = context[handlerName];
    if (typeof handler !== 'function') {
        throw new TypeError("[Pointerify] No \"" + handlerName + "\" handler method found for event type \"" + eventBinding.type + "\"");
    }
    var boundHandler = handler.bind(context);
    eventBinding.handler = (eventBinding.debounce <= 0) ?
        boundHandler : debounce_1.default(boundHandler, eventBinding.debounce, true);
    eventBinding.target.addEventListener(eventBinding.type, eventBinding.handler, {
        passive: eventBinding.passive
    });
    return eventBinding;
}
exports.default = bindEvent;
//# sourceMappingURL=bindEvent.js.map