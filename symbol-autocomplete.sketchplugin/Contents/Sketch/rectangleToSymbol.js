var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/rectangleToSymbol.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/rectangleToSymbol.js":
/*!**********************************!*\
  !*** ./src/rectangleToSymbol.js ***!
  \**********************************/
/*! exports provided: default, onRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onRectangle", function() { return onRectangle; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

var Rectangle = __webpack_require__(/*! sketch/dom */ "sketch/dom").Rectangle;

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  onRectangle();
});

function findSymbol(symbols, name) {
  for (var i = 0; i < symbols.length; i++) {
    if (symbols[i].name === name) {
      return symbols[i];
    }
  }

  return null;
}

function overrideLayers(rectangle, instance) {
  var originalParent = rectangle.parent;
  rectangle.remove();
  instance.parent = originalParent;
}

function overrideButton(rectangle, symbols) {
  var symbol = findSymbol(symbols, "button");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.y = rectangle.frame.y;
  overrideLayers(rectangle, instance);
}

function overrideFooter(rectangle, symbols) {
  var symbol = findSymbol(symbols, "footer");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.width = rectangle.parent.frame.width;
  instance.frame.y = rectangle.parent.frame.height - symbol.frame.height;
  overrideLayers(rectangle, instance);
}

function overrideHeader(rectangle, symbols) {
  var symbol = findSymbol(symbols, "header");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.y = rectangle.frame.y;
  instance.frame.width = rectangle.parent.frame.width;
  overrideLayers(rectangle, instance);
}

function overrideCheckbox(rectangle, symbols) {
  var symbol = findSymbol(symbols, "checkbox");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.y = rectangle.frame.y;
  overrideLayers(rectangle, instance);
}

function overrideText(textlayer, symbols) {
  var symbol = findSymbol(symbols, textlayer.text);
  var instance = symbol.createNewInstance();
  instance.frame.x = textlayer.frame.x;
  instance.frame.y = textlayer.frame.y - instance.frame.height;
  overrideLayers(textlayer, instance);
}

function overrideRadioButton(oval, symbols) {
  var symbol = findSymbol(symbols, "radiobutton");
  var instance = symbol.createNewInstance();
  instance.frame.x = oval.frame.x;
  instance.frame.y = oval.frame.y;
  overrideLayers(oval, instance);
}

function overrideInput(line, symbols) {
  var symbol = findSymbol(symbols, "input");
  var instance = symbol.createNewInstance();
  instance.frame.x = line.frame.x;
  instance.frame.y = line.frame.y - instance.frame.height;
  overrideLayers(line, instance);
}

function filterRelevantSymbols(layer) {
  var x = layer.frame.x;
  var y = layer.frame.y;
  var width = layer.frame.width;
  var height = layer.frame.height;
  var symbols = document.getSymbols();
  var typeOfLayer = String(layer.sketchObject.class()); //check if text

  if (typeOfLayer === 'MSTextLayer') {
    overrideText(layer, symbols);
    return 1;
  } //check if header
  else if (typeOfLayer === 'MSRectangleShape' && x === 0 && y === 0 && width === layer.parent.frame.width) {
      overrideHeader(layer, symbols);
      return 1;
    } //check if footer
    else if (typeOfLayer === 'MSRectangleShape' && x === 0 && width === layer.parent.frame.width && y + height === layer.parent.frame.height) {
        overrideFooter(layer, symbols);
        return 1;
      } //check if button
      else if (typeOfLayer === 'MSRectangleShape' && width >= 80 && height <= 100) {
          overrideButton(layer, symbols);
          return 1;
        } //check if radio button
        else if (typeOfLayer === 'MSOvalShape' && width <= 50 && height <= 50) {
            overrideRadioButton(layer, symbols);
            return 1;
          } //check if checkbox
          else if (typeOfLayer === 'MSRectangleShape' && width <= 50 && height <= 50 && width === height) {
              overrideCheckbox(layer, symbols);
              return 1;
            } //check if input
            else if (typeOfLayer === 'MSShapePathLayer' && height <= 3) {
                overrideInput(layer, symbols);
                return 1;
              }

  return null;
}

function onRectangle(context) {
  var page = document.selectedPage;
  var layers = document.selectedLayers.layers;
  var symbol;
  var count = 0;

  if (layers.length >= 1) {
    for (var i = 0; i < layers.length; i++) {
      symbol = filterRelevantSymbols(layers[i]);

      if (symbol !== null) {
        count++;
      }
    }

    if (count === 1) {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(count + " layer replaced with a symbol. 🎉");
    } else {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(count + " layers replaced with symbols. 🎉");
    }
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Nothing was selected.");
  }
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=rectangleToSymbol.js.map