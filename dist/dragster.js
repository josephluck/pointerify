(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dragster"] = factory();
	else
		root["dragster"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Dragster = __webpack_require__(1);
	
	var _Dragster2 = _interopRequireDefault(_Dragster);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function dragster(root) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    return new _Dragster2.default(root, config);
	}
	
	module.exports = dragster;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(2);
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _EventBinding = __webpack_require__(4);
	
	var _EventBinding2 = _interopRequireDefault(_EventBinding);
	
	var _Pointer = __webpack_require__(5);
	
	var _Pointer2 = _interopRequireDefault(_Pointer);
	
	var _Util = __webpack_require__(6);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Config = __webpack_require__(7);
	
	var _Config2 = _interopRequireDefault(_Config);
	
	var _events = __webpack_require__(10);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dragster = function () {
	    /**
	     * @constructor
	     * @param {HTMLElement} root
	     * @param {object}      config
	     */
	
	    function Dragster(root, config) {
	        _classCallCheck(this, Dragster);
	
	        this.inspector = new _Pointer2.default();
	        this.pointers = [];
	        this.bindings = [];
	        this.dom = new _Dom2.default();
	        this.config = new _Config2.default();
	
	        Object.seal(this);
	
	        this.init(root, config);
	    }
	
	    /* Private Methods
	    ---------------------------------------------------------------------- */
	
	    /**
	     * @private
	     * @param  {HTMLElement} root
	     * @return {void}
	     */
	
	    _createClass(Dragster, [{
	        key: 'init',
	        value: function init(root, config) {
	            this.dom.root = root;
	
	            this.configure(config);
	
	            this.inspector.type = _Constants.POINTER_TYPE_HOVER;
	            this.inspector.state = _Constants.POINTER_STATE_INSPECTING;
	
	            this.bindEvents(_events2.default);
	        }
	
	        /**
	         * @private
	         * @param   {object} config
	         * @return  {void}
	         */
	
	    }, {
	        key: 'configure',
	        value: function configure(config) {
	            _Util2.default.extend(this.config, config, true, Dragster.handleConfigureError.bind(this));
	
	            this.config.physics.friction = Math.max(0, Math.min(1, this.config.physics.friction));
	        }
	
	        /**
	         * @private
	         * @param   {Array.<object>} eventsRaw
	         * @return  {Array.<EventBinding>}
	         */
	
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents(eventsRaw) {
	            var _this = this;
	
	            return eventsRaw.map(function (eventRaw) {
	                return _this.bindEvent(eventRaw);
	            });
	        }
	
	        /**
	         * @private
	         * @param   {object} eventRaw
	         * @return  {EventBinding}
	         */
	
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent(eventRaw) {
	            var binding = _Util2.default.extend(new _EventBinding2.default(), eventRaw);
	            var eventTypes = [];
	
	            var fn = null;
	            var el = null;
	
	            if (typeof (fn = this[binding.bind]) !== 'function') {
	                throw new Error('No method found with name "' + binding.bind + '"');
	            }
	
	            binding.fn = fn.bind(this);
	
	            if (binding.el && !((el = this.dom[binding.el]) instanceof HTMLElement)) {
	                throw new Error('No element reference with name "' + binding.el + '"');
	            } else if (!binding.el) {
	                el = window;
	            }
	
	            if (Array.isArray(binding.on)) {
	                eventTypes.push.apply(eventTypes, _toConsumableArray(binding.on));
	            } else {
	                eventTypes.push(binding.on);
	            }
	
	            binding.ref = el;
	
	            eventTypes.forEach(function (type) {
	                return binding.ref.addEventListener(type, binding.fn);
	            });
	
	            return binding;
	        }
	
	        /**
	         * @private
	         * @param   {Array.<EventBinding>} eventBindings
	         * @return  {void}
	         */
	
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents(eventBindings) {
	            var _loop = function _loop() {
	                var binding = eventBindings.pop();
	                var eventTypes = [];
	
	                if (Array.isArray(binding.on)) {
	                    eventTypes.push.apply(eventTypes, _toConsumableArray(binding.on));
	                } else {
	                    eventTypes.push(binding.on);
	                }
	
	                eventTypes.forEach(function (type) {
	                    return binding.ref.removeEventListener(type, binding.fn);
	                });
	            };
	
	            while (eventBindings.length) {
	                _loop();
	            }
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleMouseDown',
	        value: function handleMouseDown(e) {
	            var target = e.target;
	            var handleSelector = this.config.selectors.handle;
	
	            if (handleSelector && !_Util2.default.closestParent(target, handleSelector, true)) return;
	
	            this.pointers.push(this.createPointer(e, _Constants.POINTER_TYPE_MOUSE));
	
	            e.preventDefault();
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleMouseMove',
	        value: function handleMouseMove(e) {
	            var pointer = null;
	
	            // TODO: manage inspector (including start/end events when enters/leaves the target)
	
	            if (this.pointers.length < 1) return;
	
	            pointer = this.pointers[0];
	
	            if (pointer.isStopping) return;
	
	            this.movePointer(pointer, e);
	
	            e.preventDefault();
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleMouseUp',
	        value: function handleMouseUp(e) {
	            var pointer = null;
	
	            if (this.pointers.length < 1) return;
	
	            pointer = this.pointers[0];
	
	            this.releasePointer(pointer, e);
	
	            e.preventDefault();
	        }
	
	        /**
	         * @private
	         * @param   {TouchEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleTouchStart',
	        value: function handleTouchStart(e) {
	            console.log('touch start', e);
	        }
	
	        /**
	         * @private
	         * @param {TouchEvent} e
	         */
	
	    }, {
	        key: 'handleTouchMove',
	        value: function handleTouchMove(e) {}
	
	        /**
	         * @private
	         * @param   {TouchEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleTouchEnd',
	        value: function handleTouchEnd(e) {}
	
	        /**
	         * @param   {(TouchEvent|MouseEvent)}   e
	         * @param   {Symbol}                    type
	         * @return  {Pointer}
	         */
	
	    }, {
	        key: 'createPointer',
	        value: function createPointer(_ref, type) {
	            var clientX = _ref.clientX,
	                clientY = _ref.clientY;
	
	            var pointer = new _Pointer2.default();
	            var rect = this.dom.root.getBoundingClientRect();
	
	            pointer.type = type;
	            pointer.dragster = this;
	
	            pointer.startX = pointer.currentX = clientX;
	            pointer.startY = pointer.currentY = clientY;
	
	            pointer.rootWidth = rect.width;
	            pointer.rootHeight = rect.height;
	            pointer.rootOffsetX = clientX - rect.left;
	            pointer.rootOffsetY = clientY - rect.top;
	
	            pointer.down();
	
	            return pointer;
	        }
	
	        /**
	         * @param   {Pointer}
	         * @param   {(TouchEvent|MouseEvent)}   e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'movePointer',
	        value: function movePointer(pointer, _ref2) {
	            var clientX = _ref2.clientX,
	                clientY = _ref2.clientY;
	
	            var lastX = pointer.currentX;
	            var lastY = pointer.currentY;
	
	            pointer.state = _Constants.POINTER_STATE_MOVING;
	
	            // NB: Velocity equates to pixels per frame at ~60FPS
	
	            pointer.velocityX = clientX - lastX;
	            pointer.velocityY = clientY - lastY;
	
	            pointer.currentX = clientX;
	            pointer.currentY = clientY;
	
	            pointer.move();
	        }
	
	        /**
	         * @param   {Pointer}
	         * @param   {(TouchEvent|MouseEvent)}   e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'releasePointer',
	        value: function releasePointer(pointer, e) {
	            if (pointer.isPristine) {
	                this.click(e);
	
	                this.deletePointer(pointer);
	
	                return;
	            }
	
	            pointer.up();
	
	            if (this.config.physics.inertia) {
	                this.stopPointer(pointer);
	
	                return;
	            }
	
	            this.deletePointer(pointer);
	        }
	
	        /**
	         * @param   {Pointer}
	         * @return  {void}
	         */
	
	    }, {
	        key: 'stopPointer',
	        value: function stopPointer(pointer) {
	            var _this2 = this;
	
	            var initialVelocityX = pointer.velocityX;
	            var initialVelocityY = pointer.velocityY;
	
	            var lastX = pointer.currentX;
	            var lastY = pointer.currentY;
	
	            var intervalId = setInterval(function () {
	                var progress = _this2.config.physics.friction * count;
	
	                var newVelocityX = Math.max(Math.abs(initialVelocityX - initialVelocityX * progress));
	                var newVelocityY = Math.max(Math.abs(initialVelocityY - initialVelocityY * progress));
	
	                if (newVelocityX === 0 && newVelocityY === 0) {
	                    // Pointer is stationary
	
	                    clearInterval(intervalId);
	
	                    _this2.deletePointer(pointer);
	
	                    return;
	                }
	
	                pointer.velocityX = newVelocityX;
	                pointer.velocityY = newVelocityY;
	
	                pointer.currentX = Math.round(pointer.currentX + newVelocityX);
	                pointer.currentY = Math.round(pointer.currentY + newVelocityY);
	
	                pointer.rootOffsetX += newVelocityX;
	                pointer.rootOffsetY += newVelocityY;
	
	                count++;
	
	                if (pointer.currentX !== lastX || pointer.currentY !== lastY) {
	                    pointer.move();
	                }
	
	                lastX = pointer.currentX;
	                lastY = pointer.currentY;
	            }, _Constants.SIXTY_FPS);
	
	            var count = 1;
	
	            pointer.state = _Constants.POINTER_STATE_STOPPING;
	        }
	
	        /**
	         * @param  {Pointer}
	         * @return {void}
	         */
	
	    }, {
	        key: 'deletePointer',
	        value: function deletePointer(pointer) {
	            var pointerIndex = this.pointers.indexOf(pointer);
	
	            this.pointers.splice(pointerIndex, 1);
	
	            if (!pointer.isPristine) {
	                pointer.stop();
	            }
	        }
	
	        /**
	         * @param  {CustomEvent} e
	         * @return {void}
	         */
	
	    }, {
	        key: 'emitEvent',
	        value: function emitEvent(e) {
	            this.dom.root.dispatchEvent(e);
	        }
	
	        /**
	         * @param   {(TouchEvent|MouseEvent)} el
	         * @return  {void}
	         */
	
	    }, {
	        key: 'click',
	        value: function click(e) {
	            e.target.click();
	        }
	
	        /* Static Methods
	        ---------------------------------------------------------------------- */
	
	        /**
	         * @private
	         * @static
	         * @param {Error}   err
	         * @param {object}  target
	         */
	
	    }, {
	        key: 'destroy',
	
	
	        /* Public Methods
	        ---------------------------------------------------------------------- */
	
	        /**
	         * @public
	         * @public
	         * @return {void}
	         */
	
	        value: function destroy() {
	            this.unbindEvents(this.bindings);
	        }
	    }], [{
	        key: 'handleConfigureError',
	        value: function handleConfigureError(err, target) {
	            var re = /property "?(\w*)"?[,:] object/i;
	
	            var matches = null;
	            var illegalPropName = '';
	            var bestMatch = '';
	            var suggestion = '';
	
	            if (!(err instanceof TypeError) || !(matches = re.exec(err.message))) throw err;
	
	            illegalPropName = matches[1];
	
	            for (var key in target) {
	                var i = 0;
	
	                while (i < illegalPropName.length && illegalPropName.charAt(i).toLowerCase() === key.charAt(i).toLowerCase()) {
	                    i++;
	                }
	
	                if (i > bestMatch.length) {
	                    bestMatch = key;
	                }
	            }
	
	            if (bestMatch) {
	                suggestion = '. Did you mean "' + bestMatch + '"?';
	            }
	
	            throw new TypeError('[Datepicker] Invalid configuration property "' + illegalPropName + '"' + suggestion);
	        }
	    }]);
	
	    return Dragster;
	}();
	
	exports.default = Dragster;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var POINTER_TYPE_MOUSE = exports.POINTER_TYPE_MOUSE = Symbol('POINTER_TYPE_MOUSE');
	var POINTER_TYPE_HOVER = exports.POINTER_TYPE_HOVER = Symbol('POINTER_TYPE_HOVER');
	var POINTER_TYPE_TOUCH = exports.POINTER_TYPE_TOUCH = Symbol('POINTER_TYPE_TOUCH');
	
	var POINTER_STATE_PRISTINE = exports.POINTER_STATE_PRISTINE = Symbol('POINTER_STATE_PRISTINE');
	var POINTER_STATE_MOVING = exports.POINTER_STATE_MOVING = Symbol('POINTER_STATE_MOVING');
	var POINTER_STATE_INSPECTING = exports.POINTER_STATE_INSPECTING = Symbol('POINTER_STATE_INSPECTING');
	var POINTER_STATE_STOPPING = exports.POINTER_STATE_STOPPING = Symbol('POINTER_STATE_STOPPING');
	
	var EVENT_POINTER_DOWN = exports.EVENT_POINTER_DOWN = 'pointerDown';
	var EVENT_POINTER_DRAG = exports.EVENT_POINTER_DRAG = 'pointerDrag';
	var EVENT_POINTER_UP = exports.EVENT_POINTER_UP = 'pointerUp';
	var EVENT_POINTER_STOP = exports.EVENT_POINTER_STOP = 'pointerStop';
	
	var AXIS_X = exports.AXIS_X = 'X';
	var AXIS_Y = exports.AXIS_Y = 'Y';
	var AXIS_BOTH = exports.AXIS_BOTH = 'BOTH';
	
	var SIXTY_FPS = exports.SIXTY_FPS = 1000 / 60;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = function Dom() {
	    _classCallCheck(this, Dom);
	
	    this.root = null;
	    this.handle = null;
	};
	
	exports.default = Dom;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventBinding = function EventBinding() {
	    _classCallCheck(this, EventBinding);
	
	    this.el = '';
	    this.on = '';
	    this.bind = '';
	    this.ref = null;
	    this.fn = null;
	
	    Object.seal(this);
	};
	
	exports.default = EventBinding;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(2);
	
	var _State = __webpack_require__(12);
	
	var _State2 = _interopRequireDefault(_State);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pointer = function () {
	    function Pointer() {
	        _classCallCheck(this, Pointer);
	
	        this.startX = -1;
	        this.startY = -1;
	        this.currentX = -1;
	        this.currentY = -1;
	        this.rootWidth = -1;
	        this.rootHeight = -1;
	        this.rootOffsetX = -1;
	        this.rootOffsetY = -1;
	        this.velocityX = -1;
	        this.velocityY = -1;
	        this.type = null;
	        this.dragster = null;
	        this.state = _Constants.POINTER_STATE_PRISTINE;
	        this.intervalIdVelocity = -1;
	
	        Object.seal(this);
	    }
	
	    _createClass(Pointer, [{
	        key: 'down',
	        value: function down() {
	            this.dispatchEvent(_Constants.EVENT_POINTER_DOWN);
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            this.startMonitorVelocity();
	
	            this.dispatchEvent(_Constants.EVENT_POINTER_DRAG);
	        }
	    }, {
	        key: 'up',
	        value: function up() {
	            this.stopMonitorVelocity();
	
	            this.dispatchEvent(_Constants.EVENT_POINTER_UP);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.stopMonitorVelocity();
	
	            this.dispatchEvent(_Constants.EVENT_POINTER_STOP);
	        }
	    }, {
	        key: 'startMonitorVelocity',
	        value: function startMonitorVelocity() {
	            var _this = this;
	
	            var lastX = this.currentX;
	            var lastY = this.currentY;
	
	            if (this.intervalIdVelocity > -1) return;
	
	            this.intervalIdVelocity = setInterval(function () {
	                _this.velocityX = lastX - _this.currentX;
	                _this.velocityY = lastY - _this.currentY;
	
	                lastX = _this.currentX;
	                lastY = _this.currentY;
	            }, _Constants.SIXTY_FPS);
	        }
	    }, {
	        key: 'stopMonitorVelocity',
	        value: function stopMonitorVelocity() {
	            clearInterval(this.intervalIdVelocity);
	
	            this.intervalIdVelocity = -1;
	        }
	    }, {
	        key: 'dispatchEvent',
	        value: function dispatchEvent(eventType) {
	            var event = new CustomEvent(eventType, {
	                detail: this.getState(),
	                bubbles: true
	            });
	
	            this.dragster.emitEvent(event);
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            var state = new _State2.default();
	
	            state.deltaX = this.deltaX;
	            state.deltaY = this.deltaY;
	            state.multiplierX = this.multiplierX;
	            state.multiplierY = this.multiplierY;
	
	            return Object.freeze(state);
	        }
	    }, {
	        key: 'deltaX',
	        get: function get() {
	            return this.currentX - this.startX;
	        }
	    }, {
	        key: 'deltaY',
	        get: function get() {
	            return this.currentY - this.startY;
	        }
	    }, {
	        key: 'multiplierX',
	        get: function get() {
	            return (this.rootOffsetX + this.deltaX) / this.rootWidth;
	        }
	    }, {
	        key: 'multiplierY',
	        get: function get() {
	            return (this.rootOffsetY + this.deltaY) / this.rootHeight;
	        }
	    }, {
	        key: 'isMousePointer',
	        get: function get() {
	            return this.target === _Constants.POINTER_TYPE_MOUSE;
	        }
	    }, {
	        key: 'isTouchPointer',
	        get: function get() {
	            return this.target === _Constants.POINTER_TYPE_TOUCH;
	        }
	    }, {
	        key: 'isPristine',
	        get: function get() {
	            return this.state === _Constants.POINTER_STATE_PRISTINE;
	        }
	    }, {
	        key: 'isMoving',
	        get: function get() {
	            return this.state === _Constants.POINTER_STATE_MOVING;
	        }
	    }, {
	        key: 'isStopping',
	        get: function get() {
	            return this.state === _Constants.POINTER_STATE_STOPPING;
	        }
	    }]);
	
	    return Pointer;
	}();
	
	exports.default = Pointer;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, [{
	        key: 'extend',
	
	        /**
	         * Merges properties from a source object into a target object,
	         * optionally using a recursive deep extend.
	         *
	         * @param   {object}    target
	         * @param   {object}    source
	         * @param   {boolean}   [deep=false]
	         * @param   {function}  [errorHandler=null]
	         * @return  {object}
	         */
	
	        value: function extend(target, source) {
	            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var errorHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	            var sourceKeys = [];
	
	            if (!target || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	                throw new TypeError('[Util#extend] Target must be a valid object');
	            }
	
	            if (Array.isArray(source)) {
	                for (var i = 0; i < source.length; i++) {
	                    sourceKeys.push(i);
	                }
	            } else if (source) {
	                sourceKeys = Object.keys(source);
	            }
	
	            for (var _i = 0; _i < sourceKeys.length; _i++) {
	                var key = sourceKeys[_i];
	                var descriptor = Object.getOwnPropertyDescriptor(source, key);
	
	                // Skip virtual properties
	
	                if (typeof descriptor.get === 'function') continue;
	
	                if (!deep || _typeof(source[key]) !== 'object') {
	                    // All non-object primitives, or all properties if
	                    // shallow extend
	
	                    try {
	                        target[key] = source[key];
	                    } catch (err) {
	                        if (typeof errorHandler !== 'function') throw err;
	
	                        errorHandler(err, target);
	                    }
	                } else if (Array.isArray(source[key])) {
	                    // Arrays
	
	                    if (!target[key]) {
	                        target[key] = [];
	                    }
	
	                    Util.extend(target[key], source[key], deep, errorHandler);
	                } else {
	                    // Objects
	
	                    if (!target[key]) {
	                        target[key] = {};
	                    }
	
	                    Util.extend(target[key], source[key], deep, errorHandler);
	                }
	            }
	
	            return target;
	        }
	
	        /**
	         * Returns the closest parent of a given element matching the
	         * provided selector, optionally including the element itself.
	         *
	         * @param   {HTMLElement}       el
	         * @param   {string}            selector
	         * @param   {boolean}           [includeSelf]
	         * @return  {HTMLElement|null}
	         */
	
	    }, {
	        key: 'closestParent',
	        value: function closestParent(el, selector, includeSelf) {
	            var parent = el.parentNode;
	
	            if (includeSelf && el.matches(selector)) {
	                return el;
	            }
	
	            while (parent && parent !== document.body) {
	                if (parent.matches && parent.matches(selector)) {
	                    return parent;
	                } else if (parent.parentNode) {
	                    parent = parent.parentNode;
	                } else {
	                    return null;
	                }
	            }
	
	            return null;
	        }
	    }]);
	
	    return Util;
	}();
	
	exports.default = Util;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ConfigBehavior = __webpack_require__(8);
	
	var _ConfigBehavior2 = _interopRequireDefault(_ConfigBehavior);
	
	var _ConfigPhysics = __webpack_require__(11);
	
	var _ConfigPhysics2 = _interopRequireDefault(_ConfigPhysics);
	
	var _ConfigSelectors = __webpack_require__(9);
	
	var _ConfigSelectors2 = _interopRequireDefault(_ConfigSelectors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Config = function Config() {
	    _classCallCheck(this, Config);
	
	    this.behavior = new _ConfigBehavior2.default();
	    this.physics = new _ConfigPhysics2.default();
	    this.selectors = new _ConfigSelectors2.default();
	
	    Object.seal(this);
	};
	
	exports.default = Config;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Constants = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigBehavior = function ConfigBehavior() {
	    _classCallCheck(this, ConfigBehavior);
	
	    this.pressDuration = 0;
	    this.allowAxis = _Constants.AXIS_BOTH;
	
	    Object.seal(this);
	};
	
	exports.default = ConfigBehavior;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigSelectors = function ConfigSelectors() {
	    _classCallCheck(this, ConfigSelectors);
	
	    this.handle = '';
	
	    Object.seal(this);
	};
	
	exports.default = ConfigSelectors;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = [
		{
			"el": "root",
			"on": "mousedown",
			"bind": "handleMouseDown"
		},
		{
			"el": "root",
			"on": "touchstart",
			"bind": "handleTouchStart"
		},
		{
			"on": [
				"mousemove"
			],
			"bind": "handleMouseMove"
		},
		{
			"on": [
				"touchmove"
			],
			"bind": "handleTouchMove"
		},
		{
			"on": [
				"mouseup"
			],
			"bind": "handleMouseUp"
		},
		{
			"on": [
				"touchend"
			],
			"bind": "handleTouchEnd"
		}
	];

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigPhysics = function ConfigPhysics() {
	    _classCallCheck(this, ConfigPhysics);
	
	    this.inertia = true;
	    this.friction = 0.05;
	    this.easing = null;
	
	    Object.seal(this);
	};
	
	exports.default = ConfigPhysics;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var State = function State() {
	    _classCallCheck(this, State);
	
	    this.deltaX = -1;
	    this.deltaY = -1;
	    this.multiplierX = -1;
	    this.multiplierY = -1;
	
	    Object.seal(this);
	};
	
	exports.default = State;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=dragster.js.map