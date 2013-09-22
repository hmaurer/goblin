{
	var T = require('./ast.js')

	var p = function (node) {
		node.column = column()
		return node
	}
}

start
	= expression

expression
	= quantification

quantification
	= q:identifier _ vars:varlist _ '.' _ e:quantification {
		return p(T.createQuantification(q, vars, e))
	}
	/ relation

relation
	= left:biconditional _ '==' _ right:relation {
		return p(T.createRelation('==', left, right))
	}
	/ biconditional

varlist
	= head:var tail:(_ ',' _ var)* {
		var result = [head]
		for (var i = 0; i < tail.length; i++) {
			result.push(tail[i][3])
		}
		return result
	}

var
	= id:identifier t:(_ '<-' _ identifier)? {
		return p(T.createVariable(id, t[3]))
	}

biconditional
	= antecedent:implication _ '<=>' consequent:biconditional {
		return p(T.createBiconditional(antecedent, consequent))
	}
	/ implication

implication
	= antecedent:disjunction _ '=>' _ consequent:implication  {
		return p(T.createImplication(antecedent, consequent))
	}
	/ disjunction

disjunction
	= left:conjunction _ 'or' _ right:disjunction {
		return p(T.createDisjunction(left, right))
	}
	/ conjunction

conjunction
	= left:negation _ 'and' _ right:conjunction {
		return p(T.createConjunction(left, right))
	}
	/ negation

negation
	= 'not' _ e:negation {
		return p(T.createNegation(e))
	}
	/ call

call
	= p:identifier '(' args:arglist ')' {
		return p(T.createCall(p, args))
	}
	/ primary

arglist
	= head:expression tail:(_ ',' _ expression)* {
		var result = [head]
		for (var i = 0; i < tail.length; i++) {
			result.push(tail[i][3])
		}
		return result
	}

primary
	= "(" _ e:expression _ ")" {
		return e;
	}
	/ boolean_literal
	/ identifier

boolean_literal
	= 'true' { return p(T.createBooleanLiteral(true)) }
	/ 'false' { return p(T.createBooleanLiteral(false)) }

identifier
	= _ head:[a-zA-Z] tail:[a-zA-Z0-9_]* _ { return p(T.createIdentifier(head + tail.join(''))) }
_
	= [ \t\r\n]*
