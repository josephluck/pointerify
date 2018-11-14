"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointerifyFacade_1 = require("./pointerify/pointerifyFacade");
exports.Pointerify = pointerifyFacade_1.default;
var pointerifyFactory_1 = require("./pointerify/pointerifyFactory");
exports.default = pointerifyFactory_1.default;
var axis_1 = require("./shared/constants/axis");
exports.Axis = axis_1.default;
var direction_1 = require("./shared/constants/direction");
exports.Direction = direction_1.default;
var eventType_1 = require("./shared/constants/eventType");
exports.EventType = eventType_1.default;
var Events = require("./shared/events/");
exports.Events = Events;
var create = pointerifyFactory_1.default;
exports.create = create;
//# sourceMappingURL=index.js.map