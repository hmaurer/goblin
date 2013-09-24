var ArrayAdaptor = require('./../src/adaptors/array_adaptor')

var exports = module.exports,
	sources = exports.sources = {},
	predicates = exports.predicates = {};

sources['bool'] = new ArrayAdaptor([true, false])

sources['digit'] = new ArrayAdaptor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

predicates['even'] = {
	signature: ['digit'],
	body: function (x) {
		return x % 2 == 0
	}
}
