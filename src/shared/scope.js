function Scope(parent) {
	this.parent  = parent;
	this.objects = {};
}

Scope.prototype.set = function (key, value) {
	this.objects[key] = value
}

Scope.prototype.get = function (key) {
	var obj = this.objects[key]
	if (obj != undefined) {
		return obj
	}
	return this.parent ? this.parent.get(key) : undefined
}

Scope.prototype.has = function (key) {
	return Object.has(this.objects, key) || (this.parent ? this.parent.has(key) : false)
}

module.exports = Scope
