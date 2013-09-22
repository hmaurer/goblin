var assert = require('assert')

var Goblin = require('./../src/goblin')

var goblin = new Goblin()

goblin.source('bool', {
	iterate: function (f) {
		f(true)
		f(false)
	}
})

var test = function (code, result) {
	assert.equal(goblin.evaluate(code), result)
}

var invalid = function (code) {
	assert.throws(function () {
		goblin.evaluate(code)
	})
}

describe('Propositional logic', function () {
	it('De Morgan\'s laws should hold', function () {
		test('forall a, b. not (a and b) == not a or not b', true)
		test('forall a, b. not (a or b) == not a and not b', true)
	})

	it('tautologies should always be true', function () {
		test('forall x. x or not x', true)
	})

	it('inconsistencies should always be false', function () {
		test('forall x. x and not x', false)
	})

	it('existential quantifier should behave as expected', function () {
		test('some x. x', true)
	})

	it('unknown variables should throw an error', function () {
		invalid('x')
	})

	it('variable whose type cannot be inferred should throw an error', function () {
		invalid('forall x. x == x')
	})

	it('variable cannot have the same name as datasources', function () {
		invalid('forall bool. bool')
	})

	it('inferred type of a variable must matched actual type', function () {
		invalid('forall x <- foo. x')
	})
})
