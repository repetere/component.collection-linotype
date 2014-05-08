(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log("example webapp");

var linotype = require('../../index');
},{"../../index":2}],2:[function(require,module,exports){
/*
 * linotype
 * http://github.amexpub.com/modules/linotype
 *
 * Copyright (c) 2013 AmexPub. All rights reserved.
 */

module.exports = require('./lib/linotype');

},{"./lib/linotype":3}],3:[function(require,module,exports){
/*
 * linotype
 * https://github.com/typesettin/linotype
 *
 * Copyright (c) 2014 Typesettin. All rights reserved.
 */

'use strict';

console.log('Hello World!\n');

},{}]},{},[1])