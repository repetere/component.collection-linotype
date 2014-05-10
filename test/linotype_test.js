/*
 * linotype
 * https://github.com/condenast
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */

'use strict';

var should = require('chai').should();
var Linotype = require('../lib/linotype');

var linotypeFactory = {
	create: function(overwrites){
		return Object.create(new Linotype(overwrites));
	}
};

describe('Linotype - paige compositor', function () {

	describe('Customization and overwriteable options', function () {
		var linotype;

		it('should return configuration object', function () {
			linotype = linotypeFactory.create();
			linotype.config().should.be.a("object");
		});

		it('should allow you to overwrite default options',function(){
			linotype = linotypeFactory.create({resize:false});
			should.equal(linotype.config().resize,false);
		});

		it('should throw ConfigurationError for incompatible scrolling options',function(){
			try{
			// 	(function(){
			// 	linotypeFactory.create({continuousVertical:true,loopBottom:true});
			// })().should.not.throw(Error);
				linotype = linotypeFactory.create({continuousVertical:true,loopBottom:true});
			}
			catch(e){
				e.name.should.equal("ConfigurationError");
			}
		});
	});
});
