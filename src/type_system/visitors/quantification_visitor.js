var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'bool');

	var childEnv = env.spawn()

	if (childEnv.scope.has(node.variable.id.name)) {
		env.error(node.variable, "Already in scope: `%0'", node.variable.id.name)
	}

	childEnv.scope.set(node.variable.id.name, {
		kind: 'variable',
		type: node.variable._type
	})

	childEnv.visit(node.expr, inferred)

	var obj = childEnv.scope.get(node.variable.id.name)

	if (obj.type == null) {
		env.error(node.variable.id, "Could not infer the type of the variable `%0'", node.variable.id.name)
	}

	if (node.variable._type != null && node.variable._type != obj.type) {
		env.error(
			node.variable,
			"Inferred type `%0' for variable `%1' does not match given type `%2'",
			obj.type, node.variable.id.name, node.variable._type
		)
	}

	node.variable._type = obj.type
	
	return 'bool'
}
