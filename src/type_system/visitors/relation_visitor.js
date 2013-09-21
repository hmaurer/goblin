var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'bool')

	var left = env.visit(node.left)
	if (left != undefined) {
		env.visit(node.right, left)	
		return left
	}
	else {
		var right = env.visit(node.right)
		if (right != undefined) {
			env.visit(node.left, right)
			return right
		}
	}
	
	return 'bool'
}
