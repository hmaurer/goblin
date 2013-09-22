require('sugar')

var type_system = require('./type_system/index')
var runtime = require('./runtime/index')

function run(ast) {
	type_system.process(ast)
	return runtime.evaluate(ast)
}

module.exports = run;
