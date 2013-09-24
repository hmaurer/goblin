module.exports = function (node, env) {
	switch (node.quantifier.name) {
		case 'forall':
			return quantify(forall, node.variable, node.expr, env);
		case 'some':
			return quantify(some, node.variable, node.expr, env);
		case 'one':
			return quantify(one, node.variable, node.expr, env);
	}
}

function quantify(quantifier, variable, expr, env) {
	var childEnv = env.spawn()
	
	var source = env.scope.get(variable._type)

	return quantifier(source, function (e) {
		childEnv.scope.set(variable.id.name, e);
		return childEnv.visit(expr);
	});
}

function some(source, p) {
	var result = false;
	source.iterate(function (e) {
		result = result || p(e);
		if (result) {
			return false
		}
	})
	return result;
}

function one(source, p) {
	var n = 0
	source.iterate(function (e) {
		if (p(e)) {
			n++
		}
		if (n > 1) {
			return false
		}
	})
	return n == 1;
}

function forall(source, p) {
	var result = true;
	source.iterate(function (e) {
		result = result && p(e);
		if (!result) {
			return false
		}
	})
	return result;
}

