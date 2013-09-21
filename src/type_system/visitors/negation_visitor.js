var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'bool')
	env.visit(node.expr, 'bool')
	
	return 'bool'	
}
