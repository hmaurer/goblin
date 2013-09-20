var utils = require('./../utils')

module.exports = function (node, env, inferred) {
	utils.assertType(node, env, inferred, 'Bool')
}
