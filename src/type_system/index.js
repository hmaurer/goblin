var Environment = require('./../shared/environment')

function env() {
	var config = {
		error_prefix: '<type error>',
		getVisitor: function (name) {
			return require('./visitors/' + name)
		}
	}
	return new Environment(config)
}

function run(ast, env) {
	return env.visit(ast, 'bool')
}

module.exports = {
	env: env,
	run: run
}
