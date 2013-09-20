{
	var T = require('./ast.js')
}

start
	= expression

expression
	= quantification

quantification
	= q:identifier _ vars:varlist _ '.' _ e:quantification {
		return T.createQuantification(q, vars, e)
	}
	/ relation

relation
	= left:biconditional _ '=' _ right:biconditional {
		return T.createRelation('=', left, right);
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
	= id:identifier t:(_ ':' _ type_name)? {
		return T.createVariable(id, t[3])
	}

biconditional
	= antecedent:implication _ '<=>' consequent:biconditional {
		return T.createBiconditional(antecedent, consequent)
	}
	/ implication

implication
	= antecedent:disjunction _ '=>' _ consequent:implication  {
		return T.createImplication(antecedent, consequent)
	}
	/ disjunction

disjunction
	= left:conjunction _ 'or' _ right:disjunction {
		return T.createDisjunction(left, right)
	}
	/ conjunction

conjunction
	= left:negation _ 'and' _ right:conjunction {
		return T.createConjunction(left, right)
	}
	/ negation

negation
	= 'not' _ e:call {
		return T.createNegation(e)
	}
	/ call

call
	= p:identifier '(' args:arglist ')' {
		return T.createCall(p, args)
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
	= 'true' { return T.createBooleanLiteral(true) }
	/ 'false' { return T.createBooleanLiteral(false) }

identifier
	= _ head:[a-zA-Z] tail:[a-zA-Z0-9_]* _ { return T.createIdentifier(head + tail.join('')) }

type_name
	= _ head:[A-Z] tail:[a-zA-Z0-9_]* _ { return T.createIdentifier(head + tail.join('')) }

_
	= [ \t\r\n]*
