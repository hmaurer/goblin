PEGJS = node_modules/.bin/pegjs --cache
MOCHA = node_modules/.bin/mocha

.PHONY: test install

default: parser

parser: src/parser/grammar.js

src/parser/grammar.js: src/parser/grammar.pegjs
	$(PEGJS) <"$<" >"$@"

test:
	$(MOCHA) test/*_test.js

install:
	npm install
