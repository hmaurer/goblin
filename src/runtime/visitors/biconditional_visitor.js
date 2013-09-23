module.exports = function (node, env) {
	var antecedent = env.visit(node.antecedent)
	var consequent = env.visit(node.consequent)
	return antecedent == consequent
}
