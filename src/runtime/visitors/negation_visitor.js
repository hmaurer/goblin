module.exports = function (node, env) {
	return !env.visit(node.expr)
}
