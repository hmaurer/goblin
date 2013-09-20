function Scope(parent) {
	this.parent  = parent;
	this.objects = {};
}

Scope.prototype.set = function (key, value) {
	this.objects[key] = value
}

Scope.prototype.get = function (key) {
	if (this.has(key)) {
		return this.objects[key]
	}
	else if (this.parent != null) {
		return this.parent.get(key)
	}
}

Scope.prototype.has = function (key) {
	return Object.has(this.objects, key)
}

module.exports = Scope
