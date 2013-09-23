module.exports = function (node, env, inferred) {
	var antecedent = env.visit(node.antecedent)
 	return !antecedent || env.visit(node.consequent)
}
