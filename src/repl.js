require('sugar')
var path = require('path')

var Goblin = require('./goblin')
var repl = require('repl')

var goblin = new Goblin()

function start() {
	console.log("Welcome to Goblin!")
	console.log("+ ".blue + "Prelude")
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
	var parts = str.split(' ')
	if (parts[0] == 'bindings') {
		return goblin.staticEnv.scope.objects
	}
	else if (parts[0] == 'l') {
		try {
			var module = require(path.resolve(process.cwd(), parts[1]))
			goblin.use(module)
			console.log("+ ".blue + (module.name || parts[1]))
		}
		catch (e) {
			console.log(e.message.red)
		}
	}
	else if (parts[0] == 'reset') {
		goblin.reset()
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
