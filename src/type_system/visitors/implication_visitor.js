var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'Bool')
	env.visit(node.antecedent, 'Bool')
	env.visit(node.consequent, 'Bool')
}
