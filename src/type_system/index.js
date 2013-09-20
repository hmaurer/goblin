var Environment = require('./../shared/environment')

function process(ast) {
	var config = {
		error_prefix: '<type error>',
		getVisitor: function (name) {
			return require('./visitors/' + name)
		}
	}
	var env = new Environment(config)
	return env.visit(ast, 'Bool')
}

module.exports = {
	process: process
}
