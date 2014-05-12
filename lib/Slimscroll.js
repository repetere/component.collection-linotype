/*
 * linotype
 * https://github.com/typesettin/linotype
 * @author yaw joseph etse
 * Copyright (c) 2014 Typesettin. All rights reserved.
 */

'use strict';

// var classie = require('classie'),
// 	extend = require('util-extend'),
// 	events = require('events'),
// 	util = require('util');

/**
 * creates slim scrollers.
 * @author yaw joseph etse
 * @module
 */
var Slimscroll = function(element,configuration){
	console.log("to do slim scroll plugin conversation");
};

module.exports = Slimscroll;

// If there is a window object, that at least has a document property,
// define linotype
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.Slimscroll = Slimscroll;
}