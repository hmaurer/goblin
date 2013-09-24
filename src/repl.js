require('sugar')

var Goblin = require('./goblin')
var repl = require('repl')

var goblin = new Goblin()

function start() {
	console.log("Welcome to Goblin!")
	repl.start('> ', process, function(code, context, file, callback) {
		var result, err;

		if (code[1] == ':') {
			result = command(code.slice(2, code.length - 2))
		}
		else {
			result = evaluate(code)
		}

		callback(err, result);
	});
}

function command(str) {
	if (str == 'bindings') {
		return goblin.staticEnv.scope.objects
	}
	else {
		return "unknown command ':" + str + "'"
	}
}

function evaluate(code) {
	var result;
	try {
		result = goblin.evaluate(code)
	}
	catch (err) {
		if (err.message && err.column != undefined) {
			var separator = new Array(err.message.length+1).join('-').red
			console.log(new Array(err.column+1).join(" ") + "^".red)
			console.log(separator)
			console.log(err.message.red)
			console.log(separator)
		}
		else {
			console.log(err)
		}
	}
	return result
}

module.exports = {
	start: start
}
