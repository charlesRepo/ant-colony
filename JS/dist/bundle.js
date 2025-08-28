/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html, body {
  margin: 0;
  padding: 0;
  background: #000; /* matches menu backdrop */
  color: #ddd;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}

main#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

canvas {
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  image-rendering: pixelated;
}

`, "",{"version":3,"sources":["webpack://./style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,gBAAgB,EAAE,0BAA0B;EAC5C,WAAW;EACX,8FAA8F;AAChG;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,sCAAsC;EACtC,0BAA0B;AAC5B","sourcesContent":["html, body {\n  margin: 0;\n  padding: 0;\n  background: #000; /* matches menu backdrop */\n  color: #ddd;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;\n}\n\nmain#app {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n}\n\ncanvas {\n  box-shadow: 0 8px 24px rgba(0,0,0,0.5);\n  image-rendering: pixelated;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/Ant.js":
/*!********************!*\
  !*** ./src/Ant.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ant: () => (/* binding */ Ant)
/* harmony export */ });
class Ant {
  constructor(location, homeTrail, foodTrail, toxicTrail) {
    this.location = location.copy();
    this.homeTrail = homeTrail || [];
    this.foodTrail = foodTrail || [];
    this.toxicTrail = toxicTrail || [];
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.wandertheta = 0;
    this.wSize = 4; this.hSize = this.wSize * 2; this.offset = this.wSize / 2.5;
    this.antSize = this.wSize * this.hSize;
    this.maxSpeed = 3; this.minSpeed = 2.5; this.maxForce = 0.6;
    this.mass = 3;
    this.antColor = color(40, 10, 0);
    this.lifeSpan = 255; this.border = -10; this.r = 50;
    this.attackPredatorFlag = false;
    this.antTrappedFlag = false;
    this.hasFoodFlag = false; this.hasBiscuitFlag = false; this.hasSugarFlag = false; this.hasToxicFlag = false;
    this.intoxicated = false; this.isToxic = false;
  }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force) { const f = force.copy().div(this.mass); this.acceleration.add(f); }
  addHomePheromone() { this.homeTrail.push(this.location.copy()); }
  addFoodPheromone() { this.foodTrail.push(this.location.copy()); }
  addToxicPheromone() { this.toxicTrail.push(this.location.copy()); }
  wander() {
    const wanderR = 25, wanderD = 10, change = 3;
    this.wandertheta += random(-change, change);
    const circleLoc = this.velocity.copy().normalize().mult(wanderD).add(this.location);
    const h = this.velocity.heading();
    const circleOffSet = createVector(wanderR * cos(this.wandertheta + h), wanderR * sin(this.wandertheta + h));
    const target = p5.Vector.add(circleLoc, circleOffSet);
    this.seek(target);
  }
  seek(target) {
    const desired = p5.Vector.sub(target, this.location).setMag(random(this.minSpeed, this.maxSpeed));
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  flee(target) {
    const desired = p5.Vector.sub(this.location, target).setMag(random(this.minSpeed, this.maxSpeed));
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  arrive(target) {
    const desired = p5.Vector.sub(target, this.location);
    const d = desired.mag();
    const speed = (d < this.r) ? map(d, 0, this.r, 0, this.maxSpeed) : this.maxSpeed;
    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  findFoodPheromone(biscuit, sugar, toxic) {
    for (let i = this.foodTrail.length - 1; i >= 0; i--) {
      const v = this.foodTrail[i];
      const d = p5.Vector.sub(this.location, v).mag();
      const targetBiscuit = createVector(biscuit.location.x, biscuit.location.y);
      const targetSugar = createVector(sugar.location.x, sugar.location.y);
      const targetToxic = createVector(toxic.location.x, toxic.location.y);
      if (!this.hasFoodFlag && d < 10 && biscuit.grid.length > 0) { this.arrive(targetBiscuit); i = 0; }
      if (!this.hasFoodFlag && d < 10 && sugar.grid.length > 0) { this.arrive(targetSugar); i = 0; }
      if (!this.hasFoodFlag && d < 10 && toxic.grid.length > 0) {
        if (this.intoxicated) this.flee(targetToxic); else this.arrive(targetToxic);
        i = 0;
      }
    }
  }
  findHomePheromone(home) {
    for (let i = this.homeTrail.length - 1; i >= 0; i--) {
      const v = this.homeTrail[i];
      const d = p5.Vector.sub(this.location, v).mag();
      const target = createVector(home.origin.x, home.origin.y);
      if (this.hasFoodFlag && d < 10) { this.arrive(target); i = 0; }
    }
  }
  findToxicPheromone() {
    for (let i = this.toxicTrail.length - 1; i >= 0; i--) {
      const v = this.toxicTrail[i];
      const d = p5.Vector.sub(this.location, v).mag();
      const target = createVector(v.x, v.y);
      if (this.hasFoodFlag && d < 10) { this.flee(target); i = 0; }
    }
  }
  findFood(biscuit, sugar, toxic, isToxicFood) {
    const db = p5.Vector.sub(this.location, biscuit.location).mag();
    const ds = p5.Vector.sub(this.location, sugar.location).mag();
    const dt = p5.Vector.sub(this.location, toxic.location).mag();
    const targetBiscuit = createVector(biscuit.location.x, biscuit.location.y);
    const targetSugar = createVector(sugar.location.x, sugar.location.y);
    const targetToxic = createVector(toxic.location.x, toxic.location.y);
    if (biscuit.noFood()) {
      if (biscuit.grid.length > 0) {
        if (!this.hasFoodFlag && db < 100) this.arrive(targetBiscuit);
        if (db < 20 && !this.hasFoodFlag) {
          biscuit.eatFood(this.location);
          this.hasFoodFlag = biscuit.hasParticle();
          this.hasBiscuitFlag = this.hasFoodFlag;
          this.hasSugarFlag = false; this.hasToxicFlag = false;
        }
      }
    }
    if (sugar.noFood()) {
      if (sugar.grid.length > 0) {
        if (!this.hasFoodFlag && ds < 150) this.arrive(targetSugar);
        if (ds < 20 && !this.hasFoodFlag) {
          sugar.eatFood(this.location);
          this.hasFoodFlag = sugar.hasParticle();
          this.hasSugarFlag = this.hasFoodFlag;
          this.hasBiscuitFlag = false; this.hasToxicFlag = false;
        }
      }
    }
    if (toxic.noFood()) {
      if (toxic.grid.length > 0) {
        if (!this.hasFoodFlag && dt < 100) this.arrive(targetToxic);
        if (dt < 20 && !this.hasFoodFlag) {
          toxic.eatFood(this.location);
          this.hasFoodFlag = toxic.hasParticle();
          this.hasToxicFlag = this.hasFoodFlag;
          this.hasBiscuitFlag = false; this.hasSugarFlag = false;
          if (!this.intoxicated) this.intoxicated = true;
          if (isToxicFood) this.flee(targetToxic);
        }
      }
    }
  }
  foodDelivery(home) {
    if (this.hasFoodFlag) {
      const d = p5.Vector.sub(this.location, home.origin).mag();
      const target = createVector(home.origin.x, home.origin.y);
      if (d < 200) this.arrive(target); else this.seek(target);
    }
  }
  reachHome(home) {
    const d = p5.Vector.sub(this.location, home.origin).mag();
    if (this.hasFoodFlag && d < home.getDiameter() - (this.antSize / 3)) return true;
    return false;
  }
  fleePredator(p) {
    const distance = p5.Vector.sub(this.location, p.location);
    const d = distance.mag();
    const target = createVector(p.location.x, p.location.y);
    if (d < 100) this.flee(target);
  }
  attackPredator(predator, ants) {
    const desiredseparation = this.r * 2; let count = 0;
    const distance = p5.Vector.sub(this.location, predator.location);
    const distanceFromTarget = distance.mag();
    const target = createVector(predator.location.x, predator.location.y);
    for (const other of ants) {
      const d = p5.Vector.dist(this.location, other.location);
      if ((d > 0) && (d < desiredseparation)) count++;
    }
    if (count > 3 && distanceFromTarget < 300) {
      this.attackPredatorFlag = true;
      this.seek(target);
      this.maxSpeed = 5;
      fill(255, 0, 0, 50);
    } else {
      this.attackPredatorFlag = false;
    }
  }
  antTrapped(home) {
    const d = p5.Vector.sub(this.location, home.origin).mag();
    const target = createVector(home.origin.x, home.origin.y);
    if (d < 30) {
      this.arrive(target);
      if (d < 10) { this.antTrappedFlag = true; this.maxForce *= 0.99; }
    }
  }
  antTrappedStatus() { return this.antTrappedFlag; }
  isIntoxicated() { return this.intoxicated; }
  hasFood() { return this.hasFoodFlag; }
  hasBiscuit() { return this.hasBiscuitFlag; }
  hasSugar() { return this.hasSugarFlag; }
  hasToxic() { return this.hasToxicFlag; }
  displayCarriedFood() {
    const head = this.velocity.heading() - PI / 2;
    push();
    translate(this.location.x, this.location.y + this.wSize);
    rotate(head);
    rect(0, 10, 5, 5);
    pop();
  }
  display() {
    const head = this.velocity.heading() - PI / 2;
    push();
    translate(this.location.x, this.location.y + this.wSize);
    this.displayAnt(this.antColor, this.lifeSpan, head, random(this.wSize - (this.offset * this.offset), this.wSize), random(this.offset - this.wSize, this.wSize), random(-this.wSize - this.offset, this.offset - this.wSize));
    pop();
  }
  displayAntIcon(x, y, value) {
    const head = PI + QUARTER_PI;
    push();
    translate(x, y);
    noStroke();
    this.setLifeSpan(value);
    this.displayAnt(color(150, 110, 40), this.lifeSpan, head, 1, 0, -5);
    pop();
  }
  setLifeSpan(value) { this.lifeSpan = value; return this.lifeSpan; }
  displayAnt(c, lifeSpan, rotation, r1, r2, r3) {
    strokeWeight(0.2);
    stroke(c, lifeSpan); fill(c, lifeSpan);
    rotate(rotation);
    rectMode(CENTER);
    strokeWeight(this.wSize * 0.1);
    line(0, 0, this.wSize, r1);
    line(0, -this.offset, this.wSize, r2);
    line(0, this.offset - this.wSize, this.wSize, r3);
    strokeWeight(this.wSize * 0.1);
    line(0, 0, -this.wSize, r1);
    line(0, -this.offset, -this.wSize, r2);
    line(0, this.offset - this.wSize, -this.wSize, r3);
    strokeWeight(this.offset * 0.1);
    line(0, this.wSize, this.wSize - this.offset, this.wSize * this.offset + this.offset);
    line(0, this.wSize, this.offset - this.wSize, this.wSize * this.offset + this.offset);
    ellipse(0, this.wSize, this.wSize * 1.2, this.wSize * 1.2);
    ellipse(0, 0, this.wSize / (this.offset - 0.1), this.wSize / (this.offset - 0.1));
    ellipse(0, 0, this.wSize / this.offset, this.wSize / this.offset);
    ellipse(0, -this.wSize - this.offset, this.wSize, this.hSize);
  }
  checkEdges() {
    if (this.location.x > width - this.border) { this.velocity.x--; this.location.x = width - this.border; }
    if (this.location.x < 0 - this.border) { this.velocity.x++; this.location.x = -this.border; }
    if (this.location.y > height - 180) { this.velocity.y--; this.location.y = height - 180; }
    else if (this.location.y < -this.border) { this.velocity.y++; this.location.y = -this.border; }
  }
}



/***/ }),

/***/ "./src/Colony.js":
/*!***********************!*\
  !*** ./src/Colony.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Colony: () => (/* binding */ Colony)
/* harmony export */ });
/* harmony import */ var _Pheromones_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pheromones.js */ "./src/Pheromones.js");
/* harmony import */ var _Ant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ant.js */ "./src/Ant.js");
/* harmony import */ var _Food_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Food.js */ "./src/Food.js");




class Colony {
  constructor(antHome, predator, predatorHome) {
    this.antHome = antHome; this.predator = predator; this.predatorHome = predatorHome;
    this.location = antHome.origin.copy();
    this.ants = [];
    this.ant = new _Ant_js__WEBPACK_IMPORTED_MODULE_1__.Ant(this.location);
    this.foodParticle = new _Food_js__WEBPACK_IMPORTED_MODULE_2__.Food();
    this.antNum = 30;
    this.pheromoneHome = new _Pheromones_js__WEBPACK_IMPORTED_MODULE_0__.PheromoneHome(5000);
    this.pheromoneFood = new _Pheromones_js__WEBPACK_IMPORTED_MODULE_0__.PheromoneFood(2000);
    this.pheromoneToxic = new _Pheromones_js__WEBPACK_IMPORTED_MODULE_0__.PheromoneToxic(500);
    this.isToxicFood = false;
    this.addAnt();
  }
  addAnt() {
    for (let i = this.antNum - 1; i >= 0; i--) {
      this.ants.push(new _Ant_js__WEBPACK_IMPORTED_MODULE_1__.Ant(this.location, this.pheromoneHome.getTrail(), this.pheromoneFood.getTrail(), this.pheromoneToxic.getTrail()));
    }
  }
  addAntN(num) {
    for (let i = 0; i < num; i++) {
      this.ants.push(new _Ant_js__WEBPACK_IMPORTED_MODULE_1__.Ant(this.location, this.pheromoneHome.getTrail(), this.pheromoneFood.getTrail(), this.pheromoneToxic.getTrail()));
    }
  }
  getAnts() { return this.ants; }
  run(menu, biscuit, sugar, toxic) {
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      if (a.hasToxic()) a.addToxicPheromone();
      if (a.hasFood()) a.addFoodPheromone(); else a.addHomePheromone();
      a.update();
      this.pheromoneFood.evaporate();
      this.pheromoneHome.evaporate();
      this.pheromoneToxic.evaporate();
      a.checkEdges();
      a.wander();
      a.findFood(biscuit, sugar, toxic, this.isToxicFood);
      a.foodDelivery(this.antHome);
      a.findFoodPheromone(biscuit, sugar, toxic);
      a.findHomePheromone(this.antHome);
      a.findToxicPheromone();
      a.fleePredator(this.predator);
      a.attackPredator(this.predator, this.ants);
      this.predator.fleeFromAnts(this.ants, this.predatorHome, menu);
      a.reachHome(this.antHome);
      a.antTrapped(this.predatorHome);
      a.update();
      if (a.isIntoxicated()) { this.ants.splice(i, 1); this.isToxicFood = true; }
      if (a.antTrappedStatus() && menu.hidePredator()) { a.lifeSpan -= 20; this.ants.splice(i, 1); }
      if (a.reachHome(this.antHome)) {
        a.lifeSpan -= 20;
        if (a.lifeSpan <= 0) { this.ants.splice(i, 1); this.addAntN(1); }
      }
    }
  }
  eatenByPredator(predator) {
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      const d = p5.Vector.sub(a.location, predator.location).mag();
      if (d < 30 && !a.attackPredatorFlag) this.ants.splice(i, 1);
    }
  }
  addAntFromMenu(menu) { if (menu.addAnt() && this.ants.length < 40) this.addAntN(1); }
  displayColony(menu) {
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      a.display();
      if (a.hasBiscuit() && !a.reachHome(this.antHome)) { this.foodParticle.setFoodColor(true, 1); a.displayCarriedFood(); }
      if (a.hasSugar() && !a.reachHome(this.antHome)) { this.foodParticle.setFoodColor(true, 2); a.displayCarriedFood(); }
      if (a.hasToxic() && !a.reachHome(this.antHome)) { this.foodParticle.setFoodColor(true, 3); a.displayCarriedFood(); }
    }
    this.pheromoneHome.display();
    this.pheromoneFood.display();
    this.pheromoneToxic.display();
  }
}



/***/ }),

/***/ "./src/Food.js":
/*!*********************!*\
  !*** ./src/Food.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Food: () => (/* binding */ Food),
/* harmony export */   FoodSource: () => (/* binding */ FoodSource)
/* harmony export */ });
class Food {
  constructor(location) { this.location = location ? location.copy() : null; }
  setAlpha(selected) { return selected ? 255 : 100; }
  foodUnit(x, y, wSize, hSize, selected, foodType) {
    this.setFoodColor(selected, foodType);
    this.displayFoodUnit(x, y, wSize, hSize);
  }
  setFoodColor(selected, foodType) {
    if (foodType === 0) this.displayBiscuit(0);
    if (foodType === 1) this.displayBiscuit(this.setAlpha(false));
    if (foodType === 1 && selected) this.displayBiscuit(this.setAlpha(true));
    if (foodType === 2) this.displaySugar(this.setAlpha(false));
    if (foodType === 2 && selected) this.displaySugar(this.setAlpha(true));
    if (foodType === 3) this.displayToxic(this.setAlpha(false));
    if (foodType === 3 && selected) this.displayToxic(this.setAlpha(true));
  }
  displayFoodUnit(x, y, wSize, hSize) {
    stroke(100);
    strokeWeight(0.5);
    rectMode(CENTER);
    rect(x, y, wSize, hSize);
  }
  displayBiscuit(alpha) { fill(color(200, 190, 120), alpha); }
  displaySugar(alpha) { fill(color(255, 255, 255), alpha); }
  displayToxic(alpha) { fill(color(0, 255, 0), alpha); }
}

class FoodSource {
  constructor(location, gridSize) {
    this.location = location.copy();
    this.grid = [];
    this.rows = gridSize;
    this.cols = gridSize;
    this.unitW = this.unitH = this.rows / 5;
    this.unitSize = this.unitW * this.unitH;
    this.counter = 0;
    this.hasParticleFlag = false;
    this.addFood = false;
    this.foodStatus = false;
    this.setGrid();
    this.counter = this.grid.length;
  }
  setGrid() {
    for (let i = 0; i < this.rows; i += this.unitW) {
      for (let j = 0; j < this.cols; j += this.unitH) {
        this.grid.push(new Food(createVector(i + this.location.x, j + this.location.y)));
      }
    }
  }
  noFood() { return this.addFood; }
  getFoodStatus(status) { this.foodStatus = !!status; return this.foodStatus; }
  setFoodStatus() {
    if (this.getFoodStatus(this.foodStatus)) { this.addFood = true; return true; }
    this.addFood = false; return false;
  }
  addBiscuit() {
    if (this.setFoodStatus()) {
      for (let i = this.grid.length - 1; i >= 0; i--) {
        const f = this.grid[i];
        f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), this.unitW, this.unitH, true, 1);
      }
    }
  }
  addSugar() {
    if (this.setFoodStatus()) {
      for (let i = this.grid.length - 1; i >= 0; i--) {
        const f = this.grid[i];
        f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), this.unitW, this.unitH, true, 2);
      }
    }
  }
  addToxic() {
    if (this.setFoodStatus()) {
      for (let i = this.grid.length - 1; i >= 0; i--) {
        const f = this.grid[i];
        f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), this.unitW, this.unitH, true, 3);
      }
    }
  }
  addFoodIcon(x, y, size, selected, type) {
    const icon = [];
    for (let i = 0; i < this.rows; i += this.unitW) {
      for (let j = 0; j < this.cols; j += this.unitH) {
        icon.push(new Food(createVector(i + x, j + y)));
      }
    }
    for (let i = icon.length - 1; i >= 0; i--) {
      const f = icon[i];
      f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), size, size, selected, type);
    }
  }
  setSelected(selected) { return !!selected; }
  hasParticle() { return this.hasParticleFlag; }
  eatFood(l) {
    for (let i = this.grid.length - this.counter; i >= 0; i--) {
      if (this.counter > 0) {
        const f = this.grid[i];
        if (this.counter >= 1) {
          this.counter--;
          if (l.x >= f.location.x - (this.unitSize - this.unitW) && l.y >= f.location.y - (this.unitSize - this.unitH)) {
            this.grid.splice(this.counter, 1);
            this.hasParticleFlag = true;
          }
        }
      }
    }
  }
}



/***/ }),

/***/ "./src/HUD.js":
/*!********************!*\
  !*** ./src/HUD.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HUD: () => (/* binding */ HUD)
/* harmony export */ });
class HUD {
  constructor(location, w, h, title = 'HUD') {
    this.location = location.copy();
    this.w = w;
    this.h = h;
    this.title = title;
  }
  displayBackground() {
    // Panel background (black, slightly transparent)
    noStroke();
    fill(0, 160);
    rectMode(CORNER);
    rect(this.location.x, this.location.y, this.w, this.h, 8);

    // Header strip
    fill(20, 20, 20, 220);
    rect(this.location.x, this.location.y - 30, this.w, 30, 8, 8, 0, 0);
    fill(220);
    textAlign(LEFT, CENTER);
    textSize(14);
    text(this.title, this.location.x + 12, this.location.y - 15);
  }
  displayMenu(menu) {
    // Draw all existing menu items inside the HUD area
    menu.displayPredator();
    menu.displayAnt();
    menu.displayFoodMenu();
    menu.reset();
  }
}


/***/ }),

/***/ "./src/Home.js":
/*!*********************!*\
  !*** ./src/Home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AntHome: () => (/* binding */ AntHome),
/* harmony export */   Home: () => (/* binding */ Home),
/* harmony export */   PredatorHome: () => (/* binding */ PredatorHome)
/* harmony export */ });
class Home {
  constructor(origin, diameter) {
    this.origin = origin.copy();
    this.diameter = diameter;
  }
  getDiameter() { return this.diameter; }
  display() {
    noStroke();
    for (let i = 255; i > 0; i -= 10) {
      strokeWeight(0.5);
      fill(100, 70, 10, 150 - i);
      ellipse(this.origin.x, this.origin.y, this.diameter + i, this.diameter + i);
    }
    fill(50, 30, 0);
    ellipse(this.origin.x, this.origin.y, this.diameter, this.diameter);
  }
}

class AntHome extends Home {}
class PredatorHome extends Home {}



/***/ }),

/***/ "./src/Land.js":
/*!*********************!*\
  !*** ./src/Land.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Land: () => (/* binding */ Land)
/* harmony export */ });
class Land {
  constructor() {
    this.wSize = width;
    this.hSize = height;
    this.size = this.wSize * this.hSize;
    this.location = createVector(0, 0);
    this.landR = 120; this.landG = 90; this.landB = 60;
    this.backgroundColor = color(this.landR, this.landG, this.landB);
    this.increment = 0.5;
  }
  displayLand() {
    rectMode(CORNER);
    noStroke();
    fill(this.backgroundColor);
    rect(this.location.x, this.location.y, this.wSize, this.hSize);
  }
  texture() {
    strokeWeight(2);
    let xOffset = 2;
    for (let x = 0; x < width; x += 5) {
      xOffset += this.increment;
      let yOffset = 2;
      for (let y = 0; y < height; y += 5) {
        yOffset += this.increment;
        const bright = noise(xOffset + 255, yOffset) * 255;
        stroke(bright, bright - 20, 0, 100);
        point(x, y);
      }
    }
  }
}



/***/ }),

/***/ "./src/Menu.js":
/*!*********************!*\
  !*** ./src/Menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Menu: () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _Ant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ant.js */ "./src/Ant.js");
/* harmony import */ var _Food_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Food.js */ "./src/Food.js");
class Menu {
  constructor(location, predator, colony) {
    this.location = location.copy();
    // Constrain menu to HUD panel at bottom: full width, fixed height 150
    this.wSize = width; this.hSize = 150;
    this.predator = predator; this.colony = colony;
    // Position icons centered vertically within HUD
    this.yPosition = this.location.y + (this.hSize / 2);
    this.ant = new _Ant_js__WEBPACK_IMPORTED_MODULE_0__.Ant(createVector(this.location.x + 380, this.yPosition));
    this.selectBiscuit = false; this.selectSugar = false; this.selectToxic = false;
    this.selected = false; this.showPredator = false; this.predatorPressed = false;
    this.resetPressed = false; this.antPressed = false;
    this.alpha1 = 50; this.alpha2 = 50; this.alpha3 = 50; this.typeCount = 0; this.value = 0;
    this.food = new _Food_js__WEBPACK_IMPORTED_MODULE_1__.Food();
    this.letter = null;
  }
  reset() { if (this.resetPressed) fill(255); else fill(100); textSize(15); textAlign(LEFT); text('RESET', this.ant.location.x + 100, this.ant.location.y + 5); }
  displayPredator() { this.value = this.predatorPressed ? 255 : 100; this.predator.displayPredatorIcon(this.value, this.location.x + 100, this.yPosition); }
  displayAnt() { this.value = this.antPressed ? 255 : 100; this.ant.displayAntIcon(this.location.x + 380, this.yPosition, this.value); fill(100); textSize(15); textAlign(LEFT); text(this.colony.ants.length + ' ants', this.location.x + 400, this.yPosition + 5); }
  displayFoodMenu() {
    const f = new _Food_js__WEBPACK_IMPORTED_MODULE_1__.FoodSource(createVector(this.location.x, this.yPosition), 25);
    this.offset = 50; this.typeCount = 1;
    for (let i = 200; i <= 300; i += this.offset) {
      this.setToggleConditions();
      f.addFoodIcon(this.location.x + i, this.yPosition, f.unitW, this.selected, this.typeCount);
      this.typeCount++;
      textSize(10); textAlign(CENTER);
      fill(255, this.alpha1); text('BISCUIT', this.location.x + (this.offset * 4), this.yPosition + 30);
      fill(255, this.alpha2); text('SUGAR', this.location.x + (this.offset * 5), this.yPosition + 30);
      fill(255, this.alpha3); text('TOXIC', this.location.x + (this.offset * 6), this.yPosition + 30);
    }
  }
  addBiscuitFromMenu(x, y, f) { f.addBiscuit(); if (this.selectBiscuit) { f.getFoodStatus(true); if (y < this.location.y) f.addFoodIcon(x, y, 5, true, 1); } }
  addSugarFromMenu(x, y, f) { f.addSugar(); if (this.selectSugar) { f.getFoodStatus(true); if (y < this.location.y) f.addFoodIcon(x, y, 5, true, 2); } }
  addToxicFromMenu(x, y, f) { f.addToxic(); if (this.selectToxic) { f.getFoodStatus(true); if (y < this.location.y) f.addFoodIcon(x, y, 5, true, 3); } }
  setToggleConditions() {
    if (this.typeCount < 4) {
      switch (this.letter) {
        case 'A':
          if (this.selectBiscuit && this.typeCount === 1) { this.selected = true; this.alpha1 = 255; }
          else if (this.typeCount !== 1) { this.selected = false; this.alpha1 = 50; }
          break;
        case 'B':
          if (this.selectSugar && this.typeCount === 2) { this.selected = true; this.alpha2 = 255; }
          else if (this.typeCount !== 2) { this.selected = false; this.alpha2 = 50; }
          break;
        case 'C':
          if (this.selectToxic && this.typeCount === 3) { this.selected = true; this.alpha3 = 255; }
          else if (this.typeCount < 3) { this.selected = false; this.alpha3 = 50; }
          break;
      }
    }
  }
  mousePressed(x, y, biscuit, sugar, toxic) {
    if (x > (this.location.x + 197) - biscuit.unitSize && x < (this.location.x + 197) + biscuit.unitSize && y > this.yPosition - biscuit.unitSize && y < this.yPosition + biscuit.unitSize) { this.selectBiscuit = !this.selectBiscuit; this.selectSugar = false; this.selectToxic = false; this.letter = 'A'; }
    if (x > (this.location.x + 247) - sugar.unitSize && x < (this.location.x + 247) + sugar.unitSize && y > this.yPosition - sugar.unitSize && y < this.yPosition + sugar.unitSize) { this.selectBiscuit = false; this.selectSugar = !this.selectSugar; this.selectToxic = false; this.letter = 'B'; }
    if (x > (this.location.x + 297) - toxic.unitSize && x < (this.location.x + 297) + toxic.unitSize && y > this.yPosition - toxic.unitSize && y < this.yPosition + toxic.unitSize) { this.selectBiscuit = false; this.selectSugar = false; this.selectToxic = !this.selectToxic; this.letter = 'C'; }
    if (x > (this.location.x + 100) - this.predator.wSize && x < (this.location.x + 100) + this.predator.wSize && y > this.yPosition - this.predator.hSize && y < this.yPosition + this.predator.hSize) { this.showPredator = !this.showPredator; this.predatorPressed = !this.predatorPressed; }
    if (x > (this.location.x + 380) - this.ant.wSize && x < (this.location.x + 380) + this.ant.wSize && y > this.yPosition - this.ant.hSize && y < this.yPosition + this.ant.hSize) { this.antPressed = true; }
    if (x > this.location.x + 480 && x < this.location.x + 530 && y > this.yPosition - 20 && y < this.yPosition + 20) { this.resetPressed = true; setup(); }
  }
  addAnt() { return this.antPressed; }
  hidePredator() { return !this.showPredator; }
  displayBar() { fill(0); rectMode(CORNER); rect(this.location.x, this.location.y, this.wSize, this.hSize); }
}

// Local imports needed by Menu class




/***/ }),

/***/ "./src/Pheromones.js":
/*!***************************!*\
  !*** ./src/Pheromones.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pheromone: () => (/* binding */ Pheromone),
/* harmony export */   PheromoneFood: () => (/* binding */ PheromoneFood),
/* harmony export */   PheromoneHome: () => (/* binding */ PheromoneHome),
/* harmony export */   PheromoneToxic: () => (/* binding */ PheromoneToxic)
/* harmony export */ });
class Pheromone {
  constructor(pheromoneSize) {
    this.pheromoneSize = pheromoneSize;
    this.trail = [];
    this.lifeSpan = 15;
  }
  getTrail() { return this.trail; }
  evaporate() {
    if (this.trail.length > this.pheromoneSize) {
      if (this.lifeSpan > 10) {
        this.lifeSpan *= 0.999;
        this.trail.shift();
      }
      this.lifeSpan += 0.01;
    }
  }
  display() {
    strokeWeight(3);
    for (let i = 0; i < this.trail.length; i++) {
      const v = this.trail[i];
      point(int(v.x), int(v.y));
    }
  }
}

class PheromoneFood extends Pheromone {
  constructor(size) { super(size); this.pherFoodColor = color(255, 255, 0); }
  display() { stroke(this.pherFoodColor, this.lifeSpan); super.display(); }
}

class PheromoneHome extends Pheromone {
  constructor(size) { super(size); this.pherHomeColor = color(0, 0, 0); }
  display() { stroke(this.pherHomeColor, this.lifeSpan); super.display(); }
}

class PheromoneToxic extends Pheromone {
  constructor(size) { super(size); this.pherToxicColor = color(0, 255, 0); }
  display() { stroke(this.pherToxicColor, this.lifeSpan); super.display(); }
}



/***/ }),

/***/ "./src/Predator.js":
/*!*************************!*\
  !*** ./src/Predator.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Predator: () => (/* binding */ Predator)
/* harmony export */ });
class Predator {
  constructor(location) {
    this.location = location.copy();
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.wandertheta = 0;
    this.wSize = 20; this.hSize = this.wSize * 2;
    this.predatorSize = this.wSize * this.hSize;
    this.maxSpeed = 3.5; this.minSpeed = 2.5;
    this.maxForce = 0.5; this.mass = 10;
    this.predatorColor = color(150, 140, 110);
    this.lifeSpan = 255; this.border = -10; this.appear = 0;
    this.isAttacked = false; this.disappear = false;
  }
  run() { this.update(); this.checkEdges(); }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.wander();
  }
  applyForce(force) {
    const f = force.copy().div(this.mass);
    this.acceleration.add(f);
  }
  wander() {
    const wanderR = 25, wanderD = 10, change = 3;
    this.wandertheta += random(-change, change);
    const circleLoc = this.velocity.copy().normalize().mult(wanderD).add(this.location);
    const h = this.velocity.heading();
    const circleOffSet = createVector(wanderR * cos(this.wandertheta + h), wanderR * sin(this.wandertheta + h));
    const target = p5.Vector.add(circleLoc, circleOffSet);
    this.seek(target);
  }
  seek(target) {
    const desired = p5.Vector.sub(target, this.location).setMag(random(this.minSpeed, this.maxSpeed));
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  flee(target) {
    const desired = p5.Vector.sub(this.location, target).setMag(random(this.minSpeed, this.maxSpeed));
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  attackAnts(ants) {
    for (const a of ants) {
      const d = p5.Vector.sub(this.location, a.location).mag();
      const target = createVector(a.location.x, a.location.y);
      if (d < 300) { this.maxSpeed = 15; this.seek(target); }
    }
  }
  fleeFromAnts(ants, home, menu) {
    for (const a of ants) {
      const d = p5.Vector.sub(this.location, a.location).mag();
      const target = createVector(a.location.x, a.location.y);
      if (d < 50 && a.attackPredatorFlag) {
        this.isAttacked = true;
        this.flee(target);
        this.enterHome(home, menu);
      } else {
        this.isAttacked = false;
        this.disappear = false;
      }
    }
  }
  enterHome(home, menu) {
    const homeDist = p5.Vector.sub(this.location, home.origin);
    const d = homeDist.mag();
    const target = createVector(home.origin.x, home.origin.y);
    if (this.isAttacked && d < 300) {
      this.seek(target);
      if (this.isAttacked && d < 40) {
        this.appear *= 0.99;
        this.disappear = true;
        menu.hidePredator();
      }
    }
  }
  display() {
    if (this.appear < 250) this.appear += 10;
    const head = this.velocity.heading() - PI / 2;
    push();
    translate(this.location.x, this.location.y + 20);
    rotate(head);
    this.displayPredator(this.appear, random(99.7, 100), random(-149.5, -150), random(-2, 2));
    pop();
  }
  displayPredatorIcon(value, x, y) {
    const head = HALF_PI + QUARTER_PI;
    push();
    translate(x, y);
    rotate(head);
    this.displayPredator(value, 100, -150, 2);
    pop();
  }
  displayPredator(lifeSpan, rotation1, rotation2, r) {
    push();
    stroke(this.predatorColor, lifeSpan);
    strokeWeight(this.wSize / 6);
    line(0, 0, this.wSize / 1.5, -this.hSize / 2.5);
    line(0, -this.hSize / 8, this.wSize / 1.5, r);
    line(0, 0, -this.wSize / 1.5, -this.hSize / 2.5);
    line(0, -this.hSize / 8, -this.wSize / 1.5, r);
    fill(red(this.predatorColor) - 80, green(this.predatorColor) - 80, blue(this.predatorColor) - 80, lifeSpan);
    noStroke();
    rotate(rotation1);
    ellipse(0, this.hSize / 4, this.wSize / 3, this.hSize / 2.5);
    triangle(0, this.hSize / 4, 0, this.hSize / 2, -this.wSize / 4, this.hSize / 2);
    rotate(rotation2);
    ellipse(0, this.hSize / 4, this.wSize / 3, this.hSize / 2.5);
    triangle(0, this.hSize / 4, 0, this.hSize / 2, this.wSize / 4, this.hSize / 2);
    pop();
    fill(this.predatorColor, lifeSpan);
    ellipse(0, 0, this.wSize / 1.5, this.wSize / 1.5);
    fill(red(this.predatorColor) - 50, green(this.predatorColor) - 50, blue(this.predatorColor) - 50, lifeSpan);
    ellipse(0, -this.hSize / 2, this.wSize, this.hSize);
    fill(this.predatorColor, lifeSpan);
    ellipse(0, -this.hSize / 1.8, this.wSize, this.hSize);
    if (!this.disappear) {
      for (let i = 0; i < 30; i++) {
        fill(red(this.predatorColor) - 50, green(this.predatorColor) - 50, blue(this.predatorColor) - 50, i);
        ellipse(0, -this.hSize / 2, (this.wSize - this.wSize / 4) - i, this.hSize - i);
      }
    }
  }
  checkEdges() {
    if (this.location.x >= width + (-10)) { this.velocity.x--; this.location.x = width + (-10); }
    else if (this.location.x <= -(-10)) { this.velocity.x++; this.location.x = -(-10); }
    if (this.location.y >= height - 200) { this.velocity.y--; this.location.y = height - 200; }
    else if (this.location.y <= -(-10)) { this.velocity.y++; this.location.y = -(-10); }
  }
}



/***/ }),

/***/ "./src/styles.js":
/*!***********************!*\
  !*** ./src/styles.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ "./style.css");




/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.js */ "./src/styles.js");
/* harmony import */ var _Home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.js */ "./src/Home.js");
/* harmony import */ var _Land_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Land.js */ "./src/Land.js");
/* harmony import */ var _Predator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Predator.js */ "./src/Predator.js");
/* harmony import */ var _Colony_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Colony.js */ "./src/Colony.js");
/* harmony import */ var _Menu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Menu.js */ "./src/Menu.js");
/* harmony import */ var _HUD_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HUD.js */ "./src/HUD.js");
/* harmony import */ var _Food_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Food.js */ "./src/Food.js");
// Assemble the sketch using ES modules and global-mode p5.









let antHome, predatorHome, land, colony, predator;
let biscuit, sugar, toxic;
let menu, hud;

// Expose p5 lifecycle functions to global (p5 global mode calls window.setup/draw)
window.setup = function () {
  const c = createCanvas(1200, 800);
  c.parent('app');

  antHome = new _Home_js__WEBPACK_IMPORTED_MODULE_1__.AntHome(createVector(100, 100), 30);
  predatorHome = new _Home_js__WEBPACK_IMPORTED_MODULE_1__.PredatorHome(createVector(width / 1.1, height / 1.7), 10);
  biscuit = new _Food_js__WEBPACK_IMPORTED_MODULE_7__.FoodSource(createVector(width / 2, height / 5), 25);
  sugar = new _Food_js__WEBPACK_IMPORTED_MODULE_7__.FoodSource(createVector(width / 2, height / 2), 25);
  toxic = new _Food_js__WEBPACK_IMPORTED_MODULE_7__.FoodSource(createVector(width / 2, height / 3), 25);
  predator = new _Predator_js__WEBPACK_IMPORTED_MODULE_3__.Predator(createVector(predatorHome.origin.x, predatorHome.origin.y - 20));
  colony = new _Colony_js__WEBPACK_IMPORTED_MODULE_4__.Colony(antHome, predator, predatorHome);
  // Place HUD as a 150px-tall panel at the bottom
  const hudTopLeft = createVector(0, height - 150);
  hud = new _HUD_js__WEBPACK_IMPORTED_MODULE_6__.HUD(hudTopLeft, width, 150, 'Controls');
  // Align menu to HUD area
  menu = new _Menu_js__WEBPACK_IMPORTED_MODULE_5__.Menu(hudTopLeft, predator, colony);
  land = new _Land_js__WEBPACK_IMPORTED_MODULE_2__.Land();
};

window.draw = function () {
  land.displayLand();
  land.texture();
  predatorHome.display();
  antHome.display();
  // HUD frame and menu items
  hud.displayBackground();
  hud.displayMenu(menu);
  menu.addBiscuitFromMenu(mouseX, mouseY, biscuit);
  menu.addSugarFromMenu(mouseX, mouseY, sugar);
  menu.addToxicFromMenu(mouseX, mouseY, toxic);
  colony.run(menu, biscuit, sugar, toxic);
  colony.displayColony(menu);
  colony.eatenByPredator(predator);
  if (menu.showPredator) { predator.run(); predator.attackAnts(colony.getAnts()); predator.display(); }
};

window.mousePressed = function () {
  colony.addAntFromMenu(menu);
  menu.mousePressed(mouseX, mouseY, biscuit, sugar, toxic);
  if (mouseY < menu.location.y) {
    if (menu.selectBiscuit) biscuit = new _Food_js__WEBPACK_IMPORTED_MODULE_7__.FoodSource(createVector(mouseX, mouseY), 25);
    if (menu.selectSugar) sugar = new _Food_js__WEBPACK_IMPORTED_MODULE_7__.FoodSource(createVector(mouseX, mouseY), 25);
    if (menu.selectToxic) toxic = new _Food_js__WEBPACK_IMPORTED_MODULE_7__.FoodSource(createVector(mouseX, mouseY), 25);
  }
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map