/*
 * linotype
 * https://github.com/typesettin/linotype
 * @author yaw joseph etse
 * Copyright (c) 2014 Typesettin. All rights reserved.
 */

'use strict';

var classie = require('classie'),
	extend = require('util-extend'),
	events = require('events'),
	util = require('util');

/**
 * A module that represents a linotype object, a linotyper is a page composition tool.
 * @author yaw joseph etse
 * @module linotype
 * @requires module:classie
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 * @property {object} defaults - the default module configuration
 */

var linotype = function(config_options){
	/** module default configuration */
	var options,
		linotypeElement,
		defaults = {
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
			'idSelector' : 'fullpage',
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
		},
		scrollDelay = (typeof config_options === "object" && typeof config_options.scrollDelay === "number") ? config_options.scrollDelay : 600,
		container,
		slideMoving = false,
		isTablet = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/),
		windowsHeight,
		isMoving = false,
		isResizing = false,
		lastScrolledDestiny,
		lastScrolledSlide;

	//extend default options
	options = extend( defaults,config_options );

	/**
	 * @exception {ConfigurationError} If conflicting scrolling options are set
	 */
	ConfigurationError.prototype = new Error();
	ConfigurationError.prototype.constructor = ConfigurationError;
	if (options.continuousVertical &&
		(options.loopTop || options.loopBottom)) {
	    options.continuousVertical = false;

		throw new ConfigurationError("Option loopTop/loopBottom is mutually exclusive with continuousVertical; continuousVertical disabled");
	}

	/** @throws Disable mutually exclusive settings */
	if (scrollDelay < 400) {
	    options.continuousVertical = false;

		throw new RangeError("BE CAREFUL! Not recommened to change it under 400 for a good behavior in laptops and Apple devices (laptops, mouses...)");
	}

	/** The current module configuration */
	this.config = function(){
		return options;
	};

	/** The current scroll delay setting */
	this.scrollDelay = function(){
		return scrollDelay;
	};

	/**
	 * set the scrolling behaviour
	 * @param {number} value
	 */
	this.setAutoScrolling = function(value){
		options.autoScrolling = value; //el = document.getElementById( options.idSelector ), //sections = el.getElementsByClassName( options.sectionClass );
		var element = document.getElementsByClassName('section active')[0],
			docElemHTML = document.getElementsByTagName("html")[0],
			docElemBody = document.getElementsByTagName("body")[0],
			elementPosition = element.getBoundingClientRect();

		if(options.autoScrolling){
			docElemHTML.style.overflow = 'hidden';
			docElemHTML.style.height = '100%';
			docElemBody.style.overflow = 'hidden';
			docElemBody.style.height = '100%';

			if(element.length){
				//moving the container up
				silentScroll(elementPosition.top);
			}
		}
		else{
			docElemHTML.style.overflow = 'auto';
			docElemHTML.style.height = 'auto';
			docElemBody.style.overflow = 'auto';
			docElemBody.style.height = 'auto';

			silentScroll(0);

			//scrolling the page to the section with no animation
			docElemHTML.scrollTop = elementPosition.top;
			docElemBody.scrollTop = elementPosition.top;
		}
	};

	/**
	 * Defines the scrolling speed 
	 * @param {number} value
	 */
	this.setScrollingSpeed = function(value){
	   options.scrollingSpeed = value;
	};

	/**
	 * Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
	 * @param {number} value
	 */
	this.setKeyboardScrolling = function (value){
		options.keyboardScrolling = value;
	};

	/**
	 * Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad. 
	 * @param {number} value
	 */
	this.setMouseWheelScrolling = function (value){
		// if(value){
		// 	addMouseWheelHandler();
		// }else{
		// 	removeMouseWheelHandler();
		// }
	};

	/**
	 * Adds or remove the possiblity of scrolling through sections by using the mouse wheel/trackpad or touch gestures. 
	 * @param {number} value
	 */
	this.setAllowScrolling = function (value){
		// console.log("allow scrolling: ",value);
		// if(value){
		// 	$.fn.fullpage.setMouseWheelScrolling(true);
		// 	addTouchHandler();
		// }else{
		// 	$.fn.fullpage.setMouseWheelScrolling(false);
		// 	removeTouchHandler();
		// }
	};

	/**
	 * intialize a new linotype
	 */
	this.init = function(){
		var docElemBody = document.getElementsByTagName('body')[0];

		windowsHeight = document.documentElement.clientHeight;
		linotypeElement = document.getElementById(options.idSelector);
		container = linotypeElement;

		this.setAllowScrolling(true);

		if(options.css3){
			options.css3 = support3d();
		}

		if(linotypeElement){
			container.style.height='100%';
			container.style.position='relative';
			container.style['-ms-touch-action']='none';
		}
		else{
			var oldBodyHTML = document.getElementsByTagName('body')[0].innerHTML;
			document.getElementsByTagName('body')[0].innerHTML='<div id="superContainer">'+oldBodyHTML+'</div>';
			container = document.getElementById('#superContainer');
		}

		//creating the navigation dots 
		if (options.navigation) {
			var navHTML = document.createElement('div');
				navHTML.innerHTML = "<ul></ul>";
				navHTML.setAttribute("id", "fullPage-nav");
			docElemBody.appendChild(navHTML);

			var nav = document.getElementById("fullPage-nav");
			nav.style.color = options.navigationColor;
			classie.addClass(nav,options.navigationPosition);
		}

		var sections = container.getElementsByClassName('section');
		for(var index = 0; index < sections.length; index++){
			var that = sections[index];
			var $this = sections[index];
			var slides = ($this !== 'undefined') ? $this.getElementsByClassName('slide') : 0;
			var numSlides = slides.length;

			//if no active section is defined, the 1st one will be the default one
			if(!index && document.getElementsByClassName('section active').length === 0) {
				classie.addClass($this,'active');
			}

			if($this.style !== undefined){
				$this.style.height = windowsHeight + 'px';

				if(options.paddingTop || options.paddingBottom){
					$this.style.padding = options.paddingTop  + ' 0 ' + options.paddingBottom + ' 0';
				}

				if (typeof options.slidesColor[index] !==  'undefined') {
					$this.style['background-color'] = options.slidesColor[index];
				}
			}

			if (typeof options.anchors[index] !== 'undefined' && typeof $this === 'object' ) {
				$this.setAttribute('data-anchor', options.anchors[index]);
			}

			if (options.navigation) {
				var link = (options.anchors.length)? options.anchors[index]:'',
					tooltip = (typeof options.navigationTooltips[index] !== 'undefined')? options.navigationTooltips[index] : '',
					navToSetHTML = document.getElementById("fullPage-nav"),
					navUL = navToSetHTML.getElementsByTagName('ul')[0],
					newLIToAdd = document.createElement('li');

				newLIToAdd.innerHTML='<a href="#' + link + '"><span></span></a></li>';
				if(tooltip){
					newLIToAdd.setAttribute('data-tooltip',tooltip);
				}
				navUL.appendChild(newLIToAdd);
			}

			// if there's any slide
			if (numSlides > 0) {
				var sliderWidth = numSlides * 100;
				var slideWidth = 100 / numSlides;
				var slidesContainerEl = document.createElement("div");
				var slidesContainerForControlsEl = document.createElement("div");
				slidesContainerEl.setAttribute('class','slidesContainer');
				slidesContainerForControlsEl.setAttribute('class','slides');

				elementContentWrapInner($this,slidesContainerEl);

				elementContentWrapInner($this,slidesContainerForControlsEl);

				$this.getElementsByClassName('slidesContainer')[0].style.width = sliderWidth + '%';
				$this.innerHTML += '<div class="controlArrow prev"></div><div class="controlArrow next"></div>';

				if(options.controlArrowColor!=='#fff'){
					$this.getElementsByClassName('controlArrow next')[0].style['border-color'] = 'transparent transparent transparent '+options.controlArrowColor;
					$this.getElementsByClassName('controlArrow prev')[0].style['border-color'] = 'transparent transparent transparent '+options.controlArrowColor;
				}

				if(!options.loopHorizontal){
					elementHideCss($this.getElementsByClassName('controlArrow prev')[0]);
				}

				if(options.slidesNavigation){
					addSlidesNavigation($this, numSlides);
				}

				// slides.each(function(index) {
				// 	//if the slide won#t be an starting point, the default will be the first one
				// 	if(!index && that.find('.slide.active').length == 0){
				// 		$(this).addClass('active');
				// 	}

				// 	$(this).css('width', slideWidth + '%');

				// 	if(options.verticalCentered){
				// 		addTableClass($(this));
				// 	}
				// });
			}
			else{
				if(options.verticalCentered){
					addTableClass($this);
				}
			}
		}

	}.bind(this);

	function elementHideCss(element){
		element.style.display="none";
	}
	function elementContentWrapInner(element,innerElement){
		var wrapper = element,
			w = innerElement,
			len = element.children.length,
			wrapper_clone = wrapper.cloneNode(true);

		wrapper.innerHTML='';
		wrapper.appendChild(w);
		var newFirstChild = wrapper.firstChild;

		newFirstChild.innerHTML=wrapper_clone.innerHTML;
	}

	/**
	 * Creates a landscape navigation bar with dots for horizontal sliders.
	 @private
	 @param {object} section - nodeelement to add navigation to
	 @param {number} numSlides - number of slides 
	 */
	function addSlidesNavigation(section, numSlides){
		console.log("addSlidesNavigation");
		console.log("section",section);
		section.innerHTML+= '<div class="fullPage-slidesNav"><ul></ul></div>';
		var nav = section.getElementsByClassName('fullPage-slidesNav')[0];
		console.log("nav",nav);

		//top or bottom
		classie.addClass(nav,options.slidesNavPosition);

		for(var i=0; i< numSlides; i++){
			nav.getElementsByTagName('ul')[0].innerHTML+='<li><a href="#"><span></span></a></li>';
		}

		//centering it
		nav.style['margin-left'] =  '-' + (nav.offsetWidth/2) + 'px';
classie.addClass(nav.getElementsByTagName('li')[0].getElementsByTagName('a')[0],'active');
	}

	/**
	 * adds table style to section
	 * @private
	 * @param { string } element - document element
	 */
	function addTableClass(element){
		classie.addClass(element,'table');
		var slidesTableContainerEl = document.createElement("div");
		slidesTableContainerEl.setAttribute('class','tableCell');
		slidesTableContainerEl.setAttribute('style',"height:'" + getTableHeight(element) + "'px;");

		elementContentWrapInner(element,slidesTableContainerEl);
	}

	/**
	 * get height for table
	 * @private
	 * @param { string } element - document element
	 */
	function getTableHeight(element){
		var sectionHeight = windowsHeight;

		// if(options.paddingTop || options.paddingBottom){
		// 	// var section = element;
		// 	// if(!section.hasClass('section')){
		// 	// 	section = element.closest('.section');
		// 	// }

		// 	// var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
		// 	// sectionHeight = (windowsHeight - paddings);
		// }

		return sectionHeight;
	}

	/**
	 * Checks for translate3d support 
	 * @return boolean
	 * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
	 */
	function support3d() {
		var el = document.createElement('p'),
			has3d,
			transforms = {
				'webkitTransform':'-webkit-transform',
				'OTransform':'-o-transform',
				'msTransform':'-ms-transform',
				'MozTransform':'-moz-transform',
				'transform':'transform'
			};

		// Add it to the body to get the computed style.
		document.body.insertBefore(el, null);

		for (var t in transforms) {
			if (el.style[t] !== undefined) {
				el.style[t] = "translate3d(1px,1px,1px)";
				has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
			}
		}

		document.body.removeChild(el);

		return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
	}


	/**
	 * return browser preview for transforms.
	 * @private
	 * @param { string } translate3d - css transform propert
	 */
	function getTransforms(translate3d){
		return {
			'-webkit-transform': translate3d,
			'-moz-transform': translate3d,
			'-ms-transform':translate3d,
			'transform': translate3d
		};
	}

	/**
	 * Adds a css3 transform property to the container class with or without animation depending on the animated param.
	 * @private
	 */
	function transformContainer(translate3d, animated){
		// container.toggleClass('easing', animated);
		var transformsObject = getTransforms(translate3d);
		classie.toggle( container, 'easing' );

		// container.css(getTransforms(translate3d));
		for(var x in transformsObject){
			container.style[x] = transformsObject[x];
		}
	}

	/**
	 * set the remove scrolling effect
	 * @private
	 * @param {number} top
	 */
	function silentScroll(top){
		if (options.css3) {
			var translate3d = 'translate3d(0px, -' + top + 'px, 0px)';
			transformContainer(translate3d, false);
		}
		else {
			// container.css("top", -top);
			container.style.top = -top;
		}
	}
};

module.exports = linotype;


// If there is a window object, that at least has a document property,
// define linotype
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.linotype = linotype;
}