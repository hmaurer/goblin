var Goblin = require('./goblin')
var repl = require('repl')

var goblin = new Goblin()

goblin.source('bool', {
	iterate: function (f) {
		[true, false].forEach(f)
	}
})

function start() {
	repl.start('> ', process, function(code, context, file, callback) {
		var result, err;

		try {
			result = goblin.evaluate(code)
		}
		catch (err) {
			var separator = new Array(err.message.length+1).join('-').red
			console.log(new Array(err.column+1).join(" ") + "^".red)
			console.log(separator)
			console.log(err.message.red)
			console.log(separator)
		}

		callback(err, result);
	});
}

module.exports = {
	start: start
}
