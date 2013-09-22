var Environment = require('./../shared/environment')

function env() {
	var config = {
		error_prefix: '<runtime error>',
		getVisitor: function (name) {
			return require('./visitors/' + name)
		}
	}
	return new Environment(config)
}

function run(ast, env) {
	env.scope.set('bool', {
		iterate: function (f) {
			[true, false].forEach(f)
		}
	})
	return env.visit(ast)
}

module.exports = {
	env: env,
	run: run
}
