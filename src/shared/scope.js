function Scope(parent) {
	this.parent  = parent;
	this.objects = {};
}

Scope.prototype.set = function (key, value) {
	this.objects[key] = value
}

Scope.prototype.get = function (key) {
	return this.objects[key] || (this.parent ? this.parent.get(key) : undefined)
}

Scope.prototype.has = function (key) {
	return Object.has(this.objects, key) || (this.parent ? this.parent.has(key) : false)
}

module.exports = Scope
