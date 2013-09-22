var parser = require('./src/parser/grammar')
var run = require('./src/goblin')

var repl = require('repl')

repl.start('> ', process, function(code, context, file, callback) {
	var result, err;

	try {
		var ast = parser.parse(code)
		result = run(ast)
	} catch (err) {
		if (typeof err == 'object' && err.name == "SyntaxError") {
			console.log(new Array(err.column+1).join(" ") + "^".red)
			console.log(err.message.red)
		}
		else {
			console.log(err)
		}
	}

	callback(err, result);
});
