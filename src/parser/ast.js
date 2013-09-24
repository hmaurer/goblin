var exports = module.exports

exports.createIdentifier = function (name) {
	return {
		type: 'identifier',
		name: name
	}
}

exports.createBooleanLiteral = function (value) {
	return {
		type: 'boolean_literal',
		value: value
	}
}

exports.createDisjunction = function (left, right) {
	return {
		type: 'disjunction',
		left: left,
		right: right
	}
}

exports.createConjunction = function (left, right) {
	return {
		type: 'conjunction',
		left: left,
		right: right
	}
}

exports.createNegation = function (e) {
	return {
		type: 'negation',
		expr: e
	}
}

exports.createImplication = function (antecedent, consequent) {
	return {
		type: 'implication',
		antecedent: antecedent,
		consequent: consequent
	}
}

exports.createBiconditional = function (antecedent, consequent) {
	return {
		type: 'biconditional',
		antecedent: antecedent,
		consequent: consequent
	}
}

exports.createQuantification = function (q, vars, expr) {
	return vars.reduceRight(function (e, v) {
		return {
			type: 'quantification',
			quantifier: q,
			variable: v,
			expr: e
		};
	}, expr);
}

exports.createCall = function (callee, args) {
	return {
		type: 'call',
		callee: callee,
		args: args
	}
}

exports.createVariable = function (id, t) {
	return {
		type: 'variable',
		id: id,
		_type: t
	}
}

exports.createRelation = function (op, left, right) {
	return {
		type: 'relation',
		op: op,
		left: left,
		right: right
	}
}
