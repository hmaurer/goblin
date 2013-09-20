module.exports = function (node, env) {
	return env.scope.get(node.name)
}

