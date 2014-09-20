/**
 * @title Linotype
 * @{@link https://github.com/typesettin/Linotype}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 */

'use strict';

var classie = require('classie'),
	extend = require('util-extend'),
	events = require('events'),
	util = require('util'),
	touchStartY = 0,
	touchStartX = 0,
	touchEndY = 0,
	touchEndX = 0;

/**
 * A module that represents a Linotype object, a Linotyper is a page composition tool.
 * @{@link https://github.com/typesettin/linotype}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @module Linotype
 * @requires module:classie
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 */
var Linotype = function (options) {
	/** call event emitter */
	events.EventEmitter.call(this);

	/** module default configuration */
	var defaults = {
		idSelector: 'linotype',
		start: 0,
		currentSection: 0,
		delay: 300,
		easingdelay: 700,
		easing: false,
		isMoving: false,
		keyboardScrolling: true,
		touchevents: true,
		mousewheel: true,
		sections: null,
		numSections: 0,
		touchSensitivity: 5,
		sectionHeight: null,
		callback: false,
		continuous: false
	};
	this.$el = null;

	//extend default options
	this.options = extend(defaults, options);

	this.init(this.options);
};

/** Inherit event emitter */
util.inherits(Linotype, events.EventEmitter);

/**
 * Sets up a new lintotype component.
 * @param {object} options - configuration options
 */
Linotype.prototype.initEventListeners = function () {
	/**
	 * recalculate the window dimensions.
	 * @this {object}
	 */
	var resizeEventHandler = function () {
		this.options.sectionHeight = this.options.$el.parentNode.clientHeight;
	}.bind(this);

	/**
	 * handle keyboard arrow events.
	 * @event - keydown
	 * @this {object}
	 */
	var keyboardEventHandler = function (e) {
		switch (e.which) {
			//up
		case 38:
		case 33:
			this.moveSectionUp();
			break;

			//down
		case 40:
		case 34:
			this.moveSectionDown();
			break;

			// 	//left
			// case 37:
			// 	this.moveSlideLeft();
			// 	break;

			// 	//right
			// case 39:
			// 	this.moveSlideRight();
			// 	break;

		default:
			return; // exit this handler for other keys
		}
	}.bind(this);

	/**
	 * handle mouse scroll wheel events.
	 * @event - mouse scroll
	 * @var {delta} - scroll direction
	 * @this {object}
	 */
	var mouseWheelHandler = function (e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY || -e.detail)));

		if (e.wheelDelta && e.deltaY) {
			var scrollratio = (e.wheelDelta / -e.deltaY),
				scrollfactor = (e.wheelDelta / 10);
			if (delta > 0 && scrollfactor > scrollratio) {
				this.moveSectionUp();
			}
			else if (delta < 0 && (scrollfactor * -1) > scrollratio) {
				this.moveSectionDown();
			}
		}
		else {
			if (delta < 0) {
				this.moveSectionDown({
					checkScroll: true
				});
			}
			else {
				this.moveSectionUp({
					checkScroll: true
				});
			}
		}

	}.bind(this);

	/**
	 * Gets the pageX and pageY properties depending on the browser.
	 * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
	 * @returns {object} events object of page touch points
	 * @event - mouse scroll
	 */
	var getEventsPage = function (e) {
		var events = [];
		if (window.navigator.msPointerEnabled) {
			events.y = e.pageY;
			events.x = e.pageX;
		}
		else {
			events.y = e.touches[0].pageY;
			events.x = e.touches[0].pageX;
		}
		return events;
	};

	/**
	 * handle touch start events
	 * @event - touch event
	 * @this {object}
	 */
	var touchStartHandler = function (e) {
		var touchEvents = getEventsPage(e);
		touchStartY = touchEvents.y;
		touchStartX = touchEvents.x;
		// console.log('touchStartHandler', touchStartX, touchStartY);
	};

	/**
	 * handle touch move events
	 * @event - touch event
	 * @this {object}
	 */
	var touchMoveHandler = function (e) {
		var touchEvents = getEventsPage(e);
		touchEndY = touchEvents.y;
		touchEndX = touchEvents.x;

		if (!this.options.isMoving) {
			//is the movement greater than the minimum resistance to scroll?
			if (Math.abs(touchStartY - touchEndY) > (this.options.sectionHeight / 100 * this.options.touchSensitivity)) {
				if (touchStartY > touchEndY) {
					this.moveSectionDown({
						checkScroll: true
					});
				}
				else if (touchEndY > touchStartY) {
					this.moveSectionUp({
						checkScroll: true
					});
				}
			}
		}
	}.bind(this);

	if (typeof window === 'object' && typeof window.document === 'object') {
		window.addEventListener('resize', resizeEventHandler, false);
		if (this.options.keyboardScrolling) {
			//if this.options.$el is visable/getboundingrect is in window viewport, then add handler, if not remove
			window.addEventListener('keydown', keyboardEventHandler, false);
		}
		if (this.options.mousewheel) {
			this.options.$el.addEventListener('mousewheel', mouseWheelHandler, false); //IE9, Chrome, Safari, Oper
			this.options.$el.addEventListener('wheel', mouseWheelHandler, false); //Firefox
		}
		if (this.options.touchevents) {
			this.options.$el.addEventListener('touchstart', touchStartHandler, false);
			this.options.$el.addEventListener('MSPointerDown', touchStartHandler, false);
			this.options.$el.addEventListener('touchmove', touchMoveHandler, false);
			this.options.$el.addEventListener('MSPointerMove', touchMoveHandler, false);
		}
	}
};
/**
 * Sets up a new lintotype component.
 * @param {object} options - configuration options
 */
Linotype.prototype.init = function (options) {
	this.options = options;
	this.options.$el = document.getElementById(this.options.idSelector);
	this.options.sections = document.querySelectorAll('#' + this.options.idSelector + ' .section');
	this.options.firstsection = this.options.sections[0];
	this.options.numSections = this.options.sections.length;
	this.options.sectionHeight = this.options.$el.parentNode.clientHeight;
	this.options.elementParent = this.options.$el.parentNode;
	if (document.addEventListener) {
		classie.addClass(this.options.$el, 'linotype-has-js');
		this.initEventListeners();
	}
	if (this.options.easing) {
		classie.addClass(this.options.$el, 'easing');
	}
	if (this.options.start !== 0) {
		this.section(this.options.start);
	}
	this.emit('init', this.options);
};
/**
 * Move Section up Shortcut.
 */
Linotype.prototype.moveSectionUp = function (moveOptions) {
	var currentIndex = this.options.currentSection,
		limitOnScroll = (moveOptions && moveOptions.checkScroll);
	if (limitOnScroll && this.options.sections[currentIndex].scrollTop > 10) {
		currentIndex = this.options.currentSection;
	}
	else {
		this.moveSection({
			direction: 'up'
		});
	}
};
/**
 * Move Section down Shortcut.
 */
Linotype.prototype.moveSectionDown = function (moveOptions) {
	var currentIndex = this.options.currentSection,
		limitOnScroll = (moveOptions && moveOptions.checkScroll);
	if (limitOnScroll && this.options.sections[currentIndex].scrollHeight > this.options.sectionHeight && ((this.options.sections[currentIndex].scrollTop + this.options.sectionHeight) < this.options.sections[currentIndex].scrollHeight)) {
		currentIndex = this.options.currentSection;
	}
	else {
		this.moveSection({
			direction: 'down'
		});
	}
};
/**
 * Move Section down Shortcut.
 * @param {number} sectionIndex - index of section ot jump to
 */
Linotype.prototype.section = function (sectionIndex) {
	if (!this.options.isMoving) {
		var index = (sectionIndex) ? parseInt(sectionIndex, 10) : 0;
		this.options.sections[sectionIndex].scrollTop = 0;
		this.options.isMoving = true;
		this.options.firstsection.style['margin-top'] = this.options.sectionHeight * -1 * index;
		this.options.currentSection = index;
		for (var i = 0; i < this.options.numSections; i++) {
			classie.removeClass(this.options.sections[i], 'active');
		}
		classie.addClass(this.options.sections[index], 'active');
		var delaytiming = (this.options.easing) ? this.options.easingdelay : this.options.delay;
		var t = setTimeout(function () {
			this.options.isMoving = false;
			clearTimeout(t);
		}.bind(this), delaytiming);
		if (typeof this.options.callback === 'function') {
			this.options.callback(index);
		}
		this.emit('section', index);
	}
};
/**
 * Shift section
 * @param {object} options - move direction options
 */
Linotype.prototype.moveSection = function (options) {
	var direction = 'down';

	switch (options.direction) {
	case 'up':
		direction = 'up';
		if (this.options.currentSection > 0) {
			this.section(this.options.currentSection - 1);
		}
		else if (this.options.continuous && this.options.currentSection === 0) {
			this.section(this.options.numSections - 1);
		}
		break;
	default:
		direction = 'down';
		if (this.options.currentSection < this.options.numSections - 1) {
			this.section(this.options.currentSection + 1);
		}
		else if (this.options.continuous && this.options.currentSection === this.options.numSections - 1) {
			this.section(0);
		}
		break;
	}
	this.emit('movedSection', direction);
};
/**
 * Returns current lintotype config element.
 * @return {option} - configuration object
 */
Linotype.prototype.config = function () {
	return this.lintotypeDomElement;
};
/**
 * Sets up a new lintotype component.
 * @event - simple event emitter test
 * @param {object} options - configuration options
 */
Linotype.prototype.emitTest = function (options) {
	this.emit('emittest', options);
};

module.exports = Linotype;


// If there is a window object, that at least has a document property,
// define Linotype
if (typeof window === 'object' && typeof window.document === 'object') {
	window.Linotype = Linotype;
}
