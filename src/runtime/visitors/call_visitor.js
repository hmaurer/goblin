module.exports = function (node, env) {
	var callee = env.scope.get(node.callee.name)

	var args = []
	for (var i = 0, l = node.args.length; i < l; i++) {
		var arg = env.visit(node.args[i])
		args.push(arg)
	}

	return callee.apply(null, args)
}
