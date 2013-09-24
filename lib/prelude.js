var exports = module.exports,
	sources = exports.sources = {},
	predicates = exports.predicates = {};

sources['bool'] = {
	iterate: function (f) {
		f(true)
		f(false)
	}
}

sources['digit'] = {
	iterate: function (f) {
		for (var i = 0; i < 10; i++) {
			f(i)
		}
	}
}

predicates['even'] = {
	signature: ['digit'],
	body: function (x) {
		return x % 2 == 0
	}
}
