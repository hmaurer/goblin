var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'Bool')

	// No type check atm
	env.visit(node.left)
	env.visit(node.right)
}
