"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpful_merge_1 = require("helpful-merge");
var Config_1 = require("../Config/Config");
var EventManager_1 = require("../Events/EventManager");
var events_1 = require("../Events/events");
var Pointer_1 = require("../Pointer/Pointer");
var PointerStateStatic_1 = require("../Pointer/PointerStateStatic");
var Axis_1 = require("../Shared/Constants/Axis");
var Direction_1 = require("../Shared/Constants/Direction");
var EventType_1 = require("../Shared/Constants/EventType");
var PointerStatus_1 = require("../Shared/Constants/PointerStatus");
var PointerType_1 = require("../Shared/Constants/PointerType");
var calculateHypotenuse_1 = require("../Shared/Util/calculateHypotenuse");
var clamp_1 = require("../Shared/Util/clamp");
var Refs_1 = require("./Refs");
var Pointerify = /** @class */ (function () {
    function Pointerify(root, config) {
        this.mouse = null;
        this.virtual = null;
        this.touches = {};
        this.rootRect = null;
        this.refs = new Refs_1.default();
        this.config = new Config_1.default();
        this.isClicking = false;
        this.timerIdDoubleTap = -1;
        this.eventManager = new EventManager_1.default(this);
        this.hasTapped = false;
        Object.seal(this);
        this.init(root, config);
    }
    Object.defineProperty(Pointerify.prototype, "totalTouches", {
        get: function () {
            return Object.keys(this.touches).length;
        },
        enumerable: true,
        configurable: true
    });
    Pointerify.prototype.configure = function (options) {
        var behavior = null;
        if ((behavior = options.behavior)) {
            // Uppercase enum values if present
            var allowAxis = '';
            var clampAxis = '';
            if ((allowAxis = behavior.allowAxis))
                behavior.allowAxis = allowAxis.toUpperCase();
            if ((clampAxis = behavior.clampAxis))
                behavior.clampAxis = clampAxis.toUpperCase();
        }
        helpful_merge_1.default(this.config, options, true);
        this.config.physics.friction = clamp_1.default(this.config.physics.friction, 0, 1);
    };
    Pointerify.prototype.refresh = function () {
        this.setRootGeometry();
    };
    Pointerify.prototype.destroy = function () {
        this.eventManager.unbindEvents();
    };
    Pointerify.prototype.cancelPointer = function (pointer) {
        cancelAnimationFrame(pointer.rafIdInertia);
        this.deletePointer(pointer);
    };
    Pointerify.prototype.setRootGeometry = function () {
        this.rootRect = this.refs.root.getBoundingClientRect();
    };
    Pointerify.prototype.createPointer = function (e, type, isExtending) {
        if (isExtending === void 0) { isExtending = false; }
        var pointer = new Pointer_1.default(this);
        var clientX = e.clientX, clientY = e.clientY, identifier = e.identifier;
        if (isExtending) {
            pointer.status = PointerStatus_1.default.EXTENDING;
        }
        if (typeof identifier !== 'undefined') {
            pointer.id = identifier.toString();
        }
        pointer.type = type;
        pointer.startX = pointer.currentX = clientX;
        pointer.startY = pointer.currentY = clientY;
        pointer.rootWidth = this.rootRect.width;
        pointer.rootHeight = this.rootRect.height;
        pointer.rootOffsetX = clientX - this.rootRect.left;
        pointer.rootOffsetY = clientY - this.rootRect.top;
        pointer.down();
        return pointer;
    };
    Pointerify.prototype.createVirtualPointer = function (yinPointer, yangPointer) {
        var pointer = new Pointer_1.default(this);
        var startX = (yinPointer.startX + yangPointer.startX) / 2;
        var startY = (yinPointer.startY + yangPointer.startY) / 2;
        var hypotenuse = calculateHypotenuse_1.default({ x: yinPointer.startX, y: yinPointer.startY }, { x: yangPointer.startX, y: yangPointer.startY });
        pointer.type = PointerType_1.default.VIRTUAL;
        pointer.yinPointer = yinPointer;
        pointer.yangPointer = yangPointer;
        pointer.startX = pointer.currentX = startX;
        pointer.startY = pointer.currentY = startY;
        pointer.startDistance = hypotenuse;
        pointer.rootWidth = this.rootRect.width;
        pointer.rootHeight = this.rootRect.height;
        pointer.rootOffsetX = startX - this.rootRect.left;
        pointer.rootOffsetY = startY - this.rootRect.top;
        pointer.down();
        return pointer;
    };
    Pointerify.prototype.movePointer = function (pointer, e, originalEvent) {
        if (e === void 0) { e = null; }
        if (originalEvent === void 0) { originalEvent = null; }
        var allowAxis = this.config.behavior.allowAxis;
        if (pointer.isVirtualPointer) {
            var hypotenuse = calculateHypotenuse_1.default({ x: pointer.yinPointer.currentX, y: pointer.yinPointer.currentY }, { x: pointer.yangPointer.currentX, y: pointer.yangPointer.currentY });
            pointer.currentX = (pointer.yinPointer.currentX + pointer.yangPointer.currentX) / 2;
            pointer.currentY = (pointer.yinPointer.currentY + pointer.yangPointer.currentY) / 2;
            if (hypotenuse !== pointer.currentDistance) {
                // Hypotenuse has changed, user is pinching
                pointer.currentDistance = hypotenuse;
                this.pinchPointer(pointer);
            }
        }
        else {
            pointer.currentX = e.clientX;
            pointer.currentY = e.clientY;
        }
        if (!pointer.isMoving) {
            // NB: Do not use deltas here as may report `0`
            var vector = Math.abs((pointer.currentX - pointer.startX) / (pointer.currentY - pointer.startY));
            if (allowAxis === Axis_1.default.X && vector < 1 || allowAxis === Axis_1.default.Y && vector >= 1) {
                pointer.status = PointerStatus_1.default.INVALID;
            }
        }
        if (!pointer.isInvalid) {
            // Vector is within range, move pointer
            if (pointer.isVirtualPointer && e === null) {
                pointer.status = PointerStatus_1.default.STOPPING;
            }
            else {
                pointer.status = PointerStatus_1.default.MOVING;
            }
            pointer.move();
            if (!pointer.isVirtualPointer) {
                originalEvent.preventDefault();
            }
        }
        // Move virtual pointer, regardless of vector
        if (pointer.isTouchPointer && this.virtual !== null) {
            this.movePointer(this.virtual, e, originalEvent);
        }
    };
    Pointerify.prototype.releasePointer = function (pointer, e) {
        // NB: `pointerUp` fired before pointer is deleted
        // and is included in `totalTouches` at time of event. May
        // be counterintruitive, but is neccessary if `pointerStop`
        // must always fire after `pointerUp`.
        var _this = this;
        pointer.up();
        if (pointer.isNew && !pointer.isVirtualPointer) {
            if (this.hasTapped) {
                this.hasTapped = false;
                this.tap(e, true);
            }
            else {
                this.hasTapped = true;
                this.timerIdDoubleTap = window.setTimeout(function () { return (_this.hasTapped = false); }, Pointerify.DURATION_DOUBLE_TAP);
                this.tap(e);
            }
        }
        if (!pointer.isMoving || !this.config.physics.inertia) {
            // Not moving, or inertia not enabled, delete immediately
            this.deletePointer(pointer);
        }
        else {
            // Moving + inertia enabled, allow natural stop then delete
            this.stopPointer(pointer);
        }
    };
    Pointerify.prototype.emitStatic = function (e, type) {
        var state = new PointerStateStatic_1.default();
        var event = new CustomEvent(type, {
            detail: state,
            bubbles: true
        });
        var rootOffsetX = e.clientX - this.rootRect.left;
        var rootOffsetY = e.clientY - this.rootRect.top;
        state.multiplierX = clamp_1.default(rootOffsetX / this.rootRect.width);
        state.multiplierY = clamp_1.default(rootOffsetY / this.rootRect.height);
        this.emitEvent(event);
    };
    Pointerify.prototype.emitEvent = function (e) {
        this.refs.root.dispatchEvent(e);
    };
    Pointerify.prototype.init = function (root, config) {
        this.refs.root = root;
        this.configure(config);
        this.setRootGeometry();
        this.eventManager.bindEvents(events_1.default);
    };
    Pointerify.prototype.pinchPointer = function (pointer) {
        pointer.pinch();
    };
    Pointerify.prototype.stopPointer = function (pointer) {
        var _this = this;
        var STOPPED_PXPF = 0.5;
        var initialVelocityX = pointer.velocityX;
        var initialVelocityY = pointer.velocityY;
        var directionX = pointer.directionX;
        var directionY = pointer.directionY;
        var render = function () {
            var progress = _this.config.physics.friction * count;
            var eased = _this.config.physics.easing(progress);
            var newVelocityX = initialVelocityX - (initialVelocityX * eased);
            var newVelocityY = initialVelocityY - (initialVelocityY * eased);
            newVelocityX = directionX === Direction_1.default.RIGHT ? Math.max(0, newVelocityX) : Math.min(0, newVelocityX);
            newVelocityY = directionY === Direction_1.default.DOWN ? Math.max(0, newVelocityY) : Math.min(0, newVelocityY);
            if (Math.abs(newVelocityX) < STOPPED_PXPF && Math.abs(newVelocityY) < STOPPED_PXPF) {
                // Pointer is stationary
                _this.deletePointer(pointer);
                return;
            }
            pointer.currentX = Math.round(pointer.currentX + newVelocityX);
            pointer.currentY = Math.round(pointer.currentY + newVelocityY);
            pointer.rootOffsetX += newVelocityX;
            pointer.rootOffsetY += newVelocityY;
            count++;
            if (pointer.currentX !== lastX || pointer.currentY !== lastY) {
                pointer.move();
                if (pointer.isTouchPointer && _this.virtual !== null) {
                    _this.movePointer(_this.virtual);
                }
            }
            lastX = pointer.currentX;
            lastY = pointer.currentY;
            pointer.rafIdInertia = requestAnimationFrame(render);
        };
        var count = 1;
        var lastX = pointer.currentX;
        var lastY = pointer.currentY;
        pointer.status = PointerStatus_1.default.STOPPING;
        pointer.rafIdInertia = requestAnimationFrame(render);
    };
    Pointerify.prototype.deletePointer = function (pointer) {
        pointer.stop();
        switch (pointer.type) {
            case PointerType_1.default.MOUSE:
                this.mouse = null;
                break;
            case PointerType_1.default.TOUCH:
                delete this.touches[pointer.id];
                break;
            case PointerType_1.default.VIRTUAL:
                this.virtual = null;
                break;
        }
        if (this.totalTouches < 2 && this.virtual) {
            this.deletePointer(this.virtual);
        }
    };
    Pointerify.prototype.tap = function (e, isDouble) {
        if (isDouble === void 0) { isDouble = false; }
        var target = e.target;
        this.isClicking = true;
        if (isDouble) {
            this.emitStatic(e, EventType_1.default.POINTER_DOUBLE_TAP);
        }
        else {
            this.emitStatic(e, EventType_1.default.POINTER_TAP);
        }
        while (typeof target.click !== 'function') {
            // Target is a text node
            target = target.parentElement;
        }
        target.click();
        this.isClicking = false;
    };
    Pointerify.DURATION_DOUBLE_TAP = 500;
    return Pointerify;
}());
exports.default = Pointerify;
//# sourceMappingURL=Pointerify.js.map