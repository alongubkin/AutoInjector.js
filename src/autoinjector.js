"use strict";

window.$inject = function $inject(fn) {
	var fnAsString = fn.toString();
	var tree = esprima.parse(fnAsString);
	
	var identifiers = [];
	AutoInjectorParser.parse(tree, [], identifiers);
	
	var functionName = tree.body[0].id.name;
	return new Function([fnAsString.replace(
		['function ', functionName, '()'].join(''),
		['function ', functionName, '(', identifiers.join(', '), ')'].join('')), ' return ', functionName, ';'].join(''))();
};