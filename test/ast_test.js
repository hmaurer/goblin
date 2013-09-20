require('sugar')

var assert = require("assert")

var parser = require("./../src/parser/grammar");
var T = require("./../src/parser/ast");

var assertEqual = function (a, b) {
	assert.equal(true, Object.equal(a, b));
}

describe('AST', function () {
	it('should parse an identifier', function () {
		assertEqual(
			parser.parse('x'),
			T.createIdentifier('x')
		)
	})

	it('should parse a negation', function () {
		assertEqual(
			parser.parse('not x'),
			T.createNegation(
				T.createIdentifier('x')
			)
		)
	})

	it('should parse parenthetical expressions', function () {
		assertEqual(
			parser.parse('not (not x)'),
			T.createNegation(
				T.createNegation(
					T.createIdentifier('x')
				)
			)
		)
	})
})
