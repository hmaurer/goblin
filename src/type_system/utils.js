var exports = module.exports

exports.assertType = function (node, env, inferred, actual) {
	if (inferred != null && inferred != actual) {
		env.error(node, "Inferred type `%0' does not match actual type `%1' of expression", inferred, actual)
	}
}
