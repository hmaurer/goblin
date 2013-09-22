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
	return env.visit(ast)
}

module.exports = {
	env: env,
	run: run
}
