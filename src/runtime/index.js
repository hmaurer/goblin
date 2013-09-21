var Environment = require('./../shared/environment')

function evaluate(ast) {
	var config = {
		error_prefix: '<runtime error>',
		getVisitor: function (name) {
			return require('./visitors/' + name)
		}
	}
	var env = new Environment(config)
	env.scope.set('bool', {
		iterate: function (f) {
			[true, false].forEach(f)
		}
	})
	return env.visit(ast)
}

module.exports = {
	evaluate: evaluate
}
