module.exports = function (node, env) {
	return env.visit(node.left) || env.visit(node.right)
}
