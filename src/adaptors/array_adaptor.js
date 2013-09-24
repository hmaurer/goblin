function ArrayAdaptor(elements) {
	this.elements = elements
}

ArrayAdaptor.prototype.iterate = function (f) {
	for (var i = 0, l = this.elements.length;  i < l; i++) {
		if (f(this.elements[i]) === false) {
			return
		}
	}
}

module.exports = ArrayAdaptor
