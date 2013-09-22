require('sugar')

var parser = require('./parser/grammar.js')
var type_system = require('./type_system/index')
var runtime = require('./runtime/index')

function Goblin() {
	this.reset()
}

Goblin.prototype.reset = function () {
	this.staticEnv = type_system.env()
	this.dynamicEnv = runtime.env()
}

Goblin.prototype.source = function (name, obj) {
	this.staticEnv.scope.set(name, {
		kind: 'source'
	})
	this.dynamicEnv.scope.set(name, obj)
}

Goblin.prototype.evaluate = function (code) {
	var ast = parser.parse(code)
	type_system.run(ast, this.staticEnv)
	return runtime.run(ast, this.dynamicEnv)
}

module.exports = Goblin;
