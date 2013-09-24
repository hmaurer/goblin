var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'bool')

	var callee = env.scope.get(node.callee.name)
	
	if (callee == undefined) {
		env.error(node.callee, "Not in scope: `%0'", node.callee.name)
	}
	if (callee.kind != 'predicate') {
		env.error(node.callee, "Expected kind of callee to be `predicate'. Got `%0'", callee.kind)
	}

	if (callee.signature.length != node.args.length) {
		env.error(
			node.callee, "Predicate `%0' expects `%1' arguments. `%2' given.",
			node.callee.name, callee.signature.length, node.args.length
		)
	}

	for (var i = 0, l = callee.signature.length; i < l; i++) {
		var type = callee.signature[i]
		env.visit(node.args[i], type)
	}

	return 'bool'
}
