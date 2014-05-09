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

/**
 * Represents a linotype.
 * @constructor
 * @package {object} options - configuration options for the page composition
 */
var linotype = function(options){
	var defaults = {
			'verticalCentered' : true,
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
		},
		ConfigurationError = function(message){
			this.name = "ConfigurationError";
			this.message = message || "Linotype Configuration Error";
		};

	//extend default options
	options = extend( defaults,options );


	ConfigurationError.prototype = new Error();
	ConfigurationError.prototype.constructor = ConfigurationError;


	// Disable mutually exclusive settings
	if (options.continuousVertical &&
		(options.loopTop || options.loopBottom)) {
	    options.continuousVertical = false;

		throw new ConfigurationError("Option loopTop/loopBottom is mutually exclusive with continuousVertical; continuousVertical disabled");
	}

	this.config = function(){
		return options;
	};
};

module.exports = linotype;