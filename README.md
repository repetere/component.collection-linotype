# component.collection-linotype [![Build Status](https://travis-ci.org/typesettin/component.collection-linotype.svg?branch=master)](https://travis-ci.org/typesettin/component.collection-linotype) [![NPM version](https://badge.fury.io/js/linotypejs.svg)](http://badge.fury.io/js/linotypejs)

## Example

Check out `example/index.html`, the example javascript for the example page is `resources/js/example_src.js` and in the head section of the respective examples. Full non-js graceful fallback

[Live Demo - http://typesettin.github.io/component.collection-linotype](http://typesettin.github.io/component.collection-linotype)

## Installation

```
$ npm install linotypejs
```

The full page scroll component is a browserify javascript module.


## Usage

*JavaScript*
```javascript
var LinotypeObject = require('linotypejs'),
	myLinotype;
//initialize linotype component after the dom has loaded
window.addEventListener('load',function(){
	myLinotype = new LinotypeObject({
		idSelector: 'linotype'
	});
	//expose your nav component to the window global namespace
	window.myLinotype = myLinotype;
});
```

*HTML*
```html
<html>
	<head>
  	<title>Your Page</title>
  	<link rel="stylesheet" type="text/css" href="[path/to]/component.collection-linotype.css">
  	<script src='[path/to/browserify/bundle].js'></script>
	</head>
	<body>
    <div id="linotype" class="linotype">
    	<div class="section active">
		    <h1>Page One </h1>
		    <p>the basic structure, require a linotype class (for css) and sections for each fullpage section</p>
		  </div>
		  <div class="section">
		    <h1>Page Two </h1>
		    <p>Any html content can go here</p>
		  </div>
		  <div class="section">
		    <h1>Page Three </h1>
		    <p>Keyboard, MouseWheel and Touch Support</p>
		  </div>
		  <div class="section">
		    <h1>Page Four </h1>
		  </div>
	</body>
</html>
```

##API

```javascript
myLinotype.section(1); //jump to section 1
```

###[*FULL API DOCUMENTATION*](https://github.com/typesettin/component.collection-linotype/blob/master/doc/api.md)

##Development
*Make sure you have grunt installed*
```
$ npm install -g grunt-cli
```

Then run grunt watch
```
$ grunt watch
```

##Notes
* The Navigation Module uses Node's event Emitter for event handling.
* The less file is located in `resources/stylesheets`

### About Linotypes

The linotype machine (/ˈlaɪnətaɪp/ lyn-ə-typ) is a "line casting" machine used in printing. Along with letterpress printing, linotype was the industry standard for newspapers, magazines and posters from the late 19th century to the 1960s and 70s, when it was largely replaced by offset lithography printing and computer typesetting. 

The name of the machine comes from the fact that it produces an entire line of metal type at once, hence a line-o'-type, a significant improvement over the previous industry standard, i.e., manual, letter-by-letter typesetting using a composing stick and drawers of letters.  The linotype machine operator enters text on a 90-character keyboard. 

The machine assembles matrices, which are molds for the letter forms, in a line. The assembled line is then cast as a single piece, called a slug, of type metal in a process known as "hot metal" typesetting. The matrices are then returned to the type magazine from which they came, to be reused later. This allows much faster typesetting and composition than original hand composition in which operators place down one pre-cast metal letter, punctuation mark or space at a time.  

The machine revolutionized typesetting and with it especially newspaper publishing, making it possible for a relatively small number of operators to set type for many pages on a daily basis. Before Mergenthaler's invention of the linotype in 1884, no daily newspaper in the world had more than eight pages.
