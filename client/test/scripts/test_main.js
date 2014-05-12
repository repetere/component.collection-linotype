'use strict';

// console.log("example test wepps!!s");

var linotype = require('../../../index'),
	domReady = require('detect-dom-ready');


domReady(function(){
}); //executes after dom has loaded

window.onload =function(){
	window.Linotype = new linotype({
		slidesColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
		slidesNavigation: true,
		idSelector: 'fullpage',
		navigation: true,
		css3: true,
		scrollOverflow: true,
		navigationPosition: 'right',
		navigationTooltips: ['First', 'Second', 'Third']
	});

	window.Linotype.init();
};