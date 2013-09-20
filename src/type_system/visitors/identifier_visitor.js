var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	var obj = env.scope.get(node.name)
	
	if (obj === undefined) {
		env.error(node, "Not in scope: `%0'", node.name)
	}
	if (obj.kind != 'variable') {
		env.error(node, "Expected kind of identifier `%0' to be `variable'. Got `%1'.", node.name, obj.kind)
	}
	if (obj.type == null) {
		obj.type = inferred
	}

	utils.assertType(node, env, inferred, obj.type)
}
