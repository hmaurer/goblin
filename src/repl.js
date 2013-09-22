var Goblin = require('./goblin')
var repl = require('repl')

var goblin = new Goblin()

function start() {
	repl.start('> ', process, function(code, context, file, callback) {
		var result, err;

		try {
			result = goblin.evaluate(code)
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
}

module.exports = {
	start: start
}
