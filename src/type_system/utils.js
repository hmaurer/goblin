var exports = module.exports

exports.assertType = function (node, env, inferred, actual) {
	if (inferred != null && inferred != actual) {
		env.error(node, "Inferred type `%0' of `%1' does not match specified type `%2'", inferred, node.type, actual)
	}
}
