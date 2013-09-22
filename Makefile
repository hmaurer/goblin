PEGJS = node_modules/.bin/pegjs
MOCHA = node_modules/.bin/mocha

.PHONY: test install

default: parser

parser: src/parser/grammar.js

src/parser/grammar.js: src/parser/grammar.pegjs
	pegjs src/parser/grammar.pegjs

test:
	$(MOCHA) test/*

install:
	npm install
