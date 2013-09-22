var exports = module.exports,
	sources = exports.sources = {};

sources['bool'] = {
	iterate: function (f) {
		f(true)
		f(false)
	}
}
