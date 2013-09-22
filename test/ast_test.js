require('sugar')

var assert = require("assert")

var parser = require("./../src/parser/grammar");
var T = require("./../src/parser/ast");

var helper = function (name, f) {
	this[name] = function () {
		var node = f.apply(null, Array.prototype.slice.call(arguments, 0))
		return node
	}
}

var rp = function (node) {
	if (typeof node == 'object') {
		delete node.column
		for (k in node) {
			rp(node[k])
		}
	}
	return node
}

var test = function (input, expected_ast) {
	var ast = parser.parse(input)
	assert.equal(true, Object.equal(rp(ast), expected_ast));
}

var eq = function (a, b) {
	test(a, rp(parser.parse(b)))
}

helper('id', T.createIdentifier)
helper('not', T.createNegation)
helper('and', T.createConjunction)
helper('or', T.createDisjunction)

describe('AST', function () {
	it('should parse identifiers', function () {
		test('x', id('x'))
		test('xyz', id('xyz'))
		test('P1', id('P1'))
	})

	it('should parse negations', function () {
		test('not x', not(id('x')))
		test('not not x', not(not(id('x'))))
	})

	it('should parse conjunctions', function () {
		test('a and b', and(id('a'), id('b')))
		test('a and b and c', and(id('a'), and(id('b'), id('c'))))
	})

	it('should parse parenthetical expressions', function () {
		test('not (x and y)', not(and(id('x'), id('y'))))
	})

	it('should parse conjunctions', function () {
		test('a or b', or(id('a'), id('b')))
		test('a or b or c', or(id('a'), or(id('b'), id('c'))))
	})

	it('should respect precedence order', function () {
		eq('not a and b', '(not a) and b')
		eq('a or b and c', 'a or (b and c)')
		eq('a and b or c', '(a and b) or c')
	})
})
