var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'bool')
	env.visit(node.left, 'bool')
	env.visit(node.right, 'bool')
	return 'bool'
}
