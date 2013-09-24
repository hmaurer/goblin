require('sugar')

var parser = require('./parser/grammar.js')
var type_system = require('./type_system/index')
var runtime = require('./runtime/index')

function Goblin(no_prelude) {
	this.reset()
	if (!no_prelude) {
		this.use(require('./../lib/prelude'))
	}
}

Goblin.prototype.reset = function () {
	this.staticEnv = type_system.env()
	this.dynamicEnv = runtime.env()
}

Goblin.prototype.use = function (module) {
	for (name in module.sources) {
		this.source(name, module.sources[name])
	}
	for (name in module.predicates) {
		this.predicate(name, module.predicates[name])
	}
}

Goblin.prototype.source = function (name, obj) {
	this.staticEnv.scope.set(name, {
		kind: 'source'
	})
	this.dynamicEnv.scope.set(name, obj)
}

Goblin.prototype.predicate = function (name, obj) {
	this.staticEnv.scope.set(name, {
		kind: 'predicate',
		signature: obj.signature
	})
	this.dynamicEnv.scope.set(name, obj.body)
}

Goblin.prototype.evaluate = function (code) {
	var ast = parser.parse(code)
	type_system.run(ast, this.staticEnv)
	return runtime.run(ast, this.dynamicEnv)
}

module.exports = Goblin;
