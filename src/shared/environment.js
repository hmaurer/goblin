require('colors')

var Scope = require('./scope')

function Environment(config, scope) {
	this.config = config
	this.scope = scope || new Scope()
}

Environment.prototype.spawn = function () {
	return new Environment(this.config, new Scope(this.scope))
}

Environment.prototype.error = function (node, message) {
	message = formatString(message, Array.prototype.slice.call(arguments, 2))
	console.log(this.config.error_prefix.red + ' ' + message)
	process.exit(1)
}

Environment.prototype.visit = function (node, inferred) {
	var visitor = this.config.getVisitor(getVisitorName(node))
	return visitor(node, this, inferred)
}

function getVisitorName(node) {
	var pattern = /(.{1,})([A-Z])/g
	return node.type.replace(pattern, '$1_$2').toLowerCase() + '_visitor'
}

function formatString(str, args) {
	for (var i = 0; i < args.length; i++) {
		str = str.replace('%' + i, args[i])
	}
	return str
}

module.exports = Environment
