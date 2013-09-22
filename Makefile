PEGJS = node_modules/.bin/pegjs
MOCHA = node_modules/.bin/mocha

.PHONY: test

default: build

build:
	pegjs src/parser/grammar.pegjs

test:
	$(MOCHA) test/*
