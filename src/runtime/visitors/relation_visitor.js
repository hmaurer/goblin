
module.exports = function (node, env) {
	switch (node.op) {
		case '=':
			return env.visit(node.left) == env.visit(node.right)
		default:
			env.error(node, "Unknown relation `%0'", node.op)
	}
}
