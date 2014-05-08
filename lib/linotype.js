/*
 * linotype
 * https://github.com/typesettin/linotype
 *
 * Copyright (c) 2014 Typesettin. All rights reserved.
 */

'use strict';

var classie = require('classie'),
	extend = require('util-extend'),
	events = require('events'),
	util = require('util');

var linotype = function(options){
	var defaults = {
		"verticalCentered" : true,
		'resize' : true,
		'slidesColor' : [],
		'anchors':[],
		'scrollingSpeed': 700,
		'easing': 'easeInQuart',
		'menu': false,
		'navigation': false,
		'navigationPosition': 'right',
		'navigationColor': '#000',
		'navigationTooltips': [],
		'slidesNavigation': false,
		'slidesNavPosition': 'bottom',
		'controlArrowColor': '#fff',
		'loopBottom': false,
		'loopTop': false,
		'loopHorizontal': true,
		'autoScrolling': true,
		'scrollOverflow': false,
		'css3': false,
		'paddingTop': 0,
		'paddingBottom': 0,
		'fixedElements': null,
		'normalScrollElements': null,
		'keyboardScrolling': true,
		'touchSensitivity': 5,
		'continuousVertical': false,
		'animateAnchor': true,
		'normalScrollElementTouchThreshold': 5,

		//events
		'afterLoad': null,
		'onLeave': null,
		'afterRender': null,
		'afterResize': null,
		'afterSlideLoad': null,
		'onSlideLeave': null
	};

	options = extend( defaults,options );
};

module.exports = linotype;