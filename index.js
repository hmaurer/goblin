var sugar = require('sugar')

var parser = require('./src/parser/grammar.js')
var run = require('./src/goblin.js')

try {
	var ast = parser.parse('forall x, y. (x and y) = not (not x or not y)')
} catch (e) {
	console.log(e)
	console.log(JSON.stringify(e, null, 4))
}

	var result = run(ast)

console.log(JSON.stringify(ast, null, 4))

console.log("==========================")
console.log(result);
