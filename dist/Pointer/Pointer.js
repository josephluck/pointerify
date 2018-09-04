"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axis_1 = require("../Shared/Constants/Axis");
var Direction_1 = require("../Shared/Constants/Direction");
var EventType_1 = require("../Shared/Constants/EventType");
var PointerStatus_1 = require("../Shared/Constants/PointerStatus");
var PointerType_1 = require("../Shared/Constants/PointerType");
var clamp_1 = require("../Shared/Util/clamp");
var randomHex_1 = require("../Shared/Util/randomHex");
var PointerStateDynamic_1 = require("./PointerStateDynamic");
var Pointer = /** @class */ (function () {
    function Pointer(pointerify) {
        this.id = randomHex_1.default();
        this.status = PointerStatus_1.default.NEW;
        this.rafIdInertia = -1;
        this.type = null;
        this.startX = -1;
        this.startY = -1;
        this.startDistance = -1;
        this.currentX = -1;
        this.currentY = -1;
        this.currentDistance = -1;
        this.rootWidth = -1;
        this.rootHeight = -1;
        this.rootOffsetX = -1;
        this.rootOffsetY = -1;
        this.yinPointer = null;
        this.yangPointer = null;
        this.velocitiesX = [];
        this.velocitiesY = [];
        this.velocitiesPinch = [];
        this.pointerify = null;
        this.isMonitoring = false;
        this.rafIdVelocity = -1;
        this.pointerify = pointerify;
    }
    Object.defineProperty(Pointer.prototype, "isMousePointer", {
        get: function () {
            return this.type === PointerType_1.default.MOUSE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isTouchPointer", {
        get: function () {
            return this.type === PointerType_1.default.TOUCH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isVirtualPointer", {
        get: function () {
            return this.type === PointerType_1.default.VIRTUAL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isNew", {
        get: function () {
            return this.status === PointerStatus_1.default.NEW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isInvalid", {
        get: function () {
            return this.status === PointerStatus_1.default.INVALID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isExtending", {
        get: function () {
            return this.status === PointerStatus_1.default.EXTENDING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isMoving", {
        get: function () {
            return this.status === PointerStatus_1.default.MOVING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isPinching", {
        get: function () {
            return this.status === PointerStatus_1.default.PINCHING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "isStopping", {
        get: function () {
            return this.status === PointerStatus_1.default.STOPPING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "velocityX", {
        get: function () {
            return this.velocitiesX.length && this.pointerify.config.behavior.allowAxis !== Axis_1.default.Y ?
                this.velocitiesX.reduce(function (value, sum) { return value + sum; }, 0) / this.velocitiesX.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "velocityY", {
        get: function () {
            return this.velocitiesY.length && this.pointerify.config.behavior.allowAxis !== Axis_1.default.X ?
                this.velocitiesY.reduce(function (value, sum) { return value + sum; }, 0) / this.velocitiesY.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "directionX", {
        get: function () {
            if (this.velocityX < 0) {
                return Direction_1.default.LEFT;
            }
            else if (this.velocityX > 0) {
                return Direction_1.default.RIGHT;
            }
            return Direction_1.default.STATIC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "directionY", {
        get: function () {
            if (this.velocityY < 0) {
                return Direction_1.default.UP;
            }
            else if (this.velocityY) {
                return Direction_1.default.DOWN;
            }
            return Direction_1.default.STATIC;
        },
        enumerable: true,
        configurable: true
    });
    Pointer.prototype.down = function () {
        if (this.isVirtualPointer) {
            this.dispatchEvent(EventType_1.default.VIRTUAL_POINTER_CREATE);
        }
        else {
            this.dispatchEvent(EventType_1.default.POINTER_DOWN);
        }
    };
    Pointer.prototype.move = function () {
        if (!this.isMonitoring && !this.isStopping)
            this.startMonitorVelocity();
        if (this.isVirtualPointer) {
            this.dispatchEvent(EventType_1.default.VIRTUAL_POINTER_MOVE);
        }
        else {
            this.dispatchEvent(EventType_1.default.POINTER_DRAG);
        }
    };
    Pointer.prototype.pinch = function () {
        this.dispatchEvent(EventType_1.default.VIRTUAL_POINTER_PINCH);
    };
    Pointer.prototype.up = function () {
        this.stopMonitorVelocity();
        this.dispatchEvent(EventType_1.default.POINTER_UP);
    };
    Pointer.prototype.stop = function () {
        if (this.isVirtualPointer) {
            this.dispatchEvent(EventType_1.default.VIRTUAL_POINTER_DESTROY);
        }
        else {
            this.dispatchEvent(EventType_1.default.POINTER_STOP);
        }
    };
    Object.defineProperty(Pointer.prototype, "deltaX", {
        get: function () {
            return this.pointerify.config.behavior.allowAxis === Axis_1.default.Y ? 0 : this.currentX - this.startX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "deltaY", {
        get: function () {
            return this.pointerify.config.behavior.allowAxis === Axis_1.default.X ? 0 : this.currentY - this.startY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "deltaDistance", {
        get: function () {
            return this.currentDistance - this.startDistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "deltaMultiplierX", {
        get: function () {
            return this.deltaX / this.rootWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "deltaMultiplierY", {
        get: function () {
            return this.deltaY / this.rootHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "deltaMultiplierDistance", {
        get: function () {
            return this.deltaDistance / this.startDistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "multiplierX", {
        get: function () {
            return (this.rootOffsetX + this.deltaX) / this.rootWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "multiplierY", {
        get: function () {
            return (this.rootOffsetY + this.deltaY) / this.rootHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "velocityPinch", {
        get: function () {
            return this.velocitiesPinch.length ?
                this.velocitiesPinch.reduce(function (value, sum) { return value + sum; }, 0) / this.velocitiesPinch.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "directionPinch", {
        get: function () {
            if (this.velocityPinch < 0) {
                return Direction_1.default.CONVERGE;
            }
            else if (this.velocityPinch) {
                return Direction_1.default.DIVERGE;
            }
            return Direction_1.default.STATIC;
        },
        enumerable: true,
        configurable: true
    });
    Pointer.prototype.startMonitorVelocity = function () {
        var _this = this;
        var SAMPLE_SIZE = 8;
        var lastX = this.currentX;
        var lastY = this.currentY;
        var monitor = function () {
            if (_this.velocitiesX.length === SAMPLE_SIZE)
                _this.velocitiesX.shift();
            if (_this.velocitiesY.length === SAMPLE_SIZE)
                _this.velocitiesY.shift();
            _this.velocitiesX.push(_this.currentX - lastX);
            _this.velocitiesY.push(_this.currentY - lastY);
            lastX = _this.currentX;
            lastY = _this.currentY;
            if (!_this.isMonitoring)
                return;
            _this.rafIdVelocity = requestAnimationFrame(monitor);
        };
        this.rafIdVelocity = requestAnimationFrame(monitor);
        this.isMonitoring = true;
    };
    Pointer.prototype.stopMonitorVelocity = function () {
        cancelAnimationFrame(this.rafIdVelocity);
        this.rafIdVelocity = -1;
        this.isMonitoring = false;
    };
    Pointer.prototype.dispatchEvent = function (eventType) {
        var event = new CustomEvent(eventType, {
            detail: this.getState(),
            bubbles: true
        });
        this.pointerify.emitEvent(event);
    };
    Pointer.prototype.getState = function () {
        var state = new PointerStateDynamic_1.default();
        var _a = this.pointerify.config.behavior, clampX = _a.clampX, clampY = _a.clampY;
        state.id = "pointer-" + this.id;
        state.deltaX = this.deltaX;
        state.deltaY = this.deltaY;
        state.deltaDistance = this.deltaDistance;
        state.deltaMultiplierX = this.deltaMultiplierX;
        state.deltaMultiplierY = this.deltaMultiplierY;
        state.deltaMultiplierDistance = this.deltaMultiplierDistance;
        state.multiplierX = clampX ? clamp_1.default(this.multiplierX, 0, 1) : this.multiplierX;
        state.multiplierY = clampY ? clamp_1.default(this.multiplierY, 0, 1) : this.multiplierY;
        state.velocityX = this.velocityX;
        state.velocityY = this.velocityY;
        state.velocityPinch = this.velocityPinch;
        state.directionX = this.directionX;
        state.directionY = this.directionY;
        state.directionPinch = this.directionPinch;
        state.status = this.status;
        state.type = this.type;
        return Object.freeze(state);
    };
    return Pointer;
}());
exports.default = Pointer;
//# sourceMappingURL=Pointer.js.map