Goblin
======

Rudimental first-order logic parser and interpreter

[![Build Status](https://travis-ci.org/a3gis/goblin.png?branch=master)](https://travis-ci.org/a3gis/goblin)

## Examples

    true and false
    true or true and false
    true and (true or false)
    not true
    forall x <- bool, y. x or y == not (not x and not y)
    forall x. some y. x == y
    forall x. x => (one y. x and y)
