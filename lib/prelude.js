var Table = require('cli-table');
require('colors')

var ArrayAdaptor = require('./../src/adaptors/array_adaptor')

var exports = module.exports,
	sources = exports.sources = {},
	predicates = exports.predicates = {};

exports.name = "Prelude"

sources['bool'] = new ArrayAdaptor([true, false])

sources['digit'] = new ArrayAdaptor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

sources['number'] = {
	iterate: function (f) {
		for (var i = -100; i <= 100; i++) {
			if (f(i) === false) {
				return
			}
		}
	}
}

predicates['even'] = {
	signature: ['number'],
	body: function (x) {
		return x % 2 == 0
	}
}

predicates['odd'] = {
	signature: ['number'],
	body: function (x) {
		return x % 2 != 0
	}
}

predicates['divisible'] = {
	signature: ['number', 'number'],
	body: function (a, b) {
		return a % b == 0
	}
}

var boolToStr = function (x) {
	return x ? "t".green : "f".red;
}

/*
var table = new Table({
	head: ["A", "B", "A and B", "A or B", "A -> B"]
});
*/

// Dirty
for (var i = 1; i < 10; i++) {
	predicates['t' + i] = {
		signature: new Array(i).map(function () { return "bool"; }),
		body: function () {
			var args = Array.prototype.slice.call(arguments)
			var row = args.map(boolToStr)
			var table = new Table();
			table.push(row)
			console.log(table.toString())
			return true
		}
	}
}
