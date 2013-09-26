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

