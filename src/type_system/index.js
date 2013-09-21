var Environment = require('./../shared/environment')

function process(ast) {
	var config = {
		error_prefix: '<type error>',
		getVisitor: function (name) {
			return require('./visitors/' + name)
		}
	}
	var env = new Environment(config)
	return env.visit(ast, 'bool')
}

module.exports = {
	process: process
}
