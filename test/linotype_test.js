/*
 * linotype
 * https://github.com/condenast
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */

'use strict';

var should = require('chai').should(),
	expect = require('chai').expect,
	Linotype = require('../lib/linotype'),
	// Browser = require("zombie"),
	path = require("path");

// var linotypeFactory = {
// 	create: function (overwrites) {
// 		return Object.create(new Linotype(overwrites));
// 	}
// };

// describe('Linotype - page compositor', function () {

// 	describe('Customization and overwriteable options', function () {
// 		var linotypeTest;
// 		before(function () {
// 			this.browser = new Browser();
// 			this.browser.on("error", function (error) {
// 				console.error(error);
// 			});
// 		});

// 		before(function (done) {
// 			this.browser.visit("file://" + path.resolve(__dirname, "../example/test/test1.html"), done);
// 		});

// 		it('should return configuration object', function () {
// 			linotypeTest = new this.browser.window.linotype();
// 			expect(linotypeTest.config()).to.be.a("object");
// 		});

// 		it('should allow you to overwrite default options', function () {
// 			linotypeTest = new this.browser.window.linotype({
// 				resize: false
// 			});
// 			should.equal(linotypeTest.config().resize, false);
// 		});

// 		it('should throw ConfigurationError for incompatible scrolling options', function () {
// 			try {
// 				expect(function () {
// 					linotypeTest = new this.browser.window.linotype({
// 						continuousVertical: true,
// 						loopBottom: true
// 					});
// 				}).to.throw(Error);

// 				linotypeTest = new this.browser.window.linotype({
// 					continuousVertical: true,
// 					loopBottom: true
// 				});
// 			}
// 			catch (e) {
// 				expect(e.name).to.equal("ConfigurationError");
// 			}
// 		});

// 		it('Should allow you to override default scroll Delay', function () {
// 			linotypeTest = new this.browser.window.linotype({
// 				scrollDelay: 900
// 			});

// 			expect(linotypeTest.scrollDelay()).to.equal(900);
// 		});

// 		it('Should throw RangeError if scroll delay is less than 400', function () {
// 			try {
// 				expect(function () {
// 					linotypeTest = new this.browser.window.linotype({
// 						scrollDelay: 399
// 					});
// 				}).to.throw(Error);

// 				linotypeTest = new this.browser.window.linotype({
// 					scrollDelay: 399
// 				});
// 			}
// 			catch (e) {
// 				expect(e.name).to.equal("RangeError");
// 			}
// 		});
// 	});

describe('It should have required UI/UX elements', function () {
	it('should have at least one section', function () {});
});

// });
