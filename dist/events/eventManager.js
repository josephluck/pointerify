"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = require("../shared/util/debounce");
var pascalCase_1 = require("../shared/util/pascalCase");
var eventBinding_1 = require("./eventBinding");
var handlers = require("./handlers");
var EventManager = /** @class */ (function () {
    function EventManager(pointerify) {
        this.pointerify = null;
        this.bindings = [];
        this.handlers = handlers;
        this.pointerify = pointerify;
    }
    Object.defineProperty(EventManager.prototype, "root", {
        get: function () {
            return this.pointerify.refs.root;
        },
        enumerable: true,
        configurable: true
    });
    EventManager.prototype.bindEvents = function (events) {
        this.bindings = events.map(this.bindEvent.bind(this));
    };
    EventManager.prototype.unbindEvents = function () {
        this.bindings.forEach(function (binding) { return binding.unbind(); });
    };
    EventManager.prototype.bindEvent = function (eventBindingRaw) {
        var eventBinding = new eventBinding_1.default(eventBindingRaw);
        if (!eventBinding.target)
            eventBinding.target = this.root;
        var handlerName = "handle" + pascalCase_1.default(eventBinding.type);
        var handler = this.handlers[handlerName];
        if (typeof handler !== "function") {
            throw new TypeError("[Pointerify] No \"" + handlerName + "\" handler method found for event type \"" + eventBinding.type + "\"");
        }
        var boundHandler = handler.bind(null, this.pointerify);
        eventBinding.handler =
            eventBinding.debounce <= 0
                ? boundHandler
                : debounce_1.default(boundHandler, eventBinding.debounce, true);
        eventBinding.target.addEventListener(eventBinding.type, eventBinding.handler, {
            passive: eventBinding.passive
        });
        return eventBinding;
    };
    return EventManager;
}());
exports.default = EventManager;
//# sourceMappingURL=eventManager.js.map