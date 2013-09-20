module.exports = function (node, env) {
	switch (node.quantifier.name) {
		case 'forall':
			return quantify(forall, node.variable, node.expr, env);
		case 'some':
			return quantify(some, node.variable, node.expr, env);
		default:
			env.error(node.quantifier, "Unknown quantifier '%0'", node.quantifier.name)
	}
}

function quantify(quantifier, variable, expr, env) {
	var childEnv = env.spawn()
	
	var source = env.scope.get(variable._type)

	if (source == null) {
		env.error(variable, "Could not find inferred datasource `%0'", variable._type)
	}

	return quantifier(source, function (e) {
		childEnv.scope.set(variable.id.name, e);
		return childEnv.visit(expr);
	});
}

function some(source, p) {
	var result = true;
	source.iterate(function (e) {
		result = result || p(e);
	})
	return result;
}

function forall(source, p) {
	var result = true;
	source.iterate(function (e) {
		result = result && p(e);
	})
	return result;
}

