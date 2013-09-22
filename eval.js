require('colors')

var parser = require('./src/parser/grammar.js')
var run = require('./src/goblin.js')

var expr = process.argv[2]

try {
	var ast = parser.parse(expr)
} catch (e) {
	console.log(expr)
	console.log(new Array(e.column).join(" ") + "^".red)
	console.log(new Array(e.message.length+1).join("-").red)
	console.log(e.message.red)
	console.log(new Array(e.message.length+1).join("-").red)
	process.exit(1)
}

	var result = run(ast)

console.log(JSON.stringify(ast, null, 4))

console.log("====================================")
console.log(result.toString().blue);
