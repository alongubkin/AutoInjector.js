"use strict";

window.AutoInjectorParser = {};

window.AutoInjectorParser.parse = function (node, scope, identifiers) {
	if (!node) {
		return;
	}

	switch (node.type) {
		case 'FunctionDeclaration':
		case 'FunctionExpression':		
			this.parseFunctionDeclaration(node, scope, identifiers);
			break;
			
		case 'Program':
		case 'BlockStatement':
			this.parseBlockStatement(node, scope, identifiers);
			break;
		
		case 'VariableDeclaration':
			this.parseVariableDeclaration(node, scope, identifiers);
			break;
			
		case 'VariableDeclarator':
			this.parseVariableDeclarator(node, scope, identifiers);
			break;
		
		case 'ExpressionStatement':
			this.parse(node.expression, scope, identifiers);
			break;
		
		case 'AssignmentExpression':
			this.parseAssignmentExpression(node, scope, identifiers);
			break;
		
		case 'CallExpression':
			this.parseCallExpression(node, scope, identifiers);
			break;
			
		case 'MemberExpression':
			this.parseMemberExpression(node, scope, identifiers);
			break;
		
		case 'ObjectExpression':
			this.parseObjectExpression(node, scope, identifiers);
			break;
			
		case 'Identifier':
			this.parseIdentifier(node, scope, identifiers);
			break;
		
		case 'Property':
			this.parseProperty(node, scope, identifiers);
			break;
			
		case 'BinaryExpression':
		case 'LogicalExpression':
			this.parseBinaryExpression(node, scope, identifiers);
			break;
			
		case 'IfStatement':
			this.parseIfStatement(node, scope, identifiers);
			break;
		
		case 'UnaryExpression':
		case 'ReturnStatement':
		case 'UpdateExpression':
		case 'ThrowStatement':
			this.parseUnaryExpression(node, scope, identifiers);
			break;
		
		case 'ArrayExpression':
			this.parseArrayExpression(node, scope, identifiers);
			break;
		
		case 'ConditionalExpression':
			this.parseConditionalExpression(node, scope, identifiers);
			break;
		
		case 'NewExpression':
			this.parseNewExpression(node, scope, identifiers);
			break;
			
		case 'ForStatement':
			this.parseForStatement(node, scope, identifiers);
			break;
		
		case 'SwitchStatement':
			this.parseSwitchStatement(node, scope, identifiers);
			break;
		
		case 'SwitchCase':
			this.parseSwitchCase(node, scope, identifiers);
			break;
			
		case 'Literal':
		case 'BreakStatement':
			break;
		
		default: 
			console.log('\tunknown node: ' + node.type, node);
	}
};

window.AutoInjectorParser.parseFunctionDeclaration = function (node, scope, identifiers) {
	if (node.id && node.id.type === 'Identifier') {
		if (scope.indexOf(node.id.name) === -1) {
			scope.push(node.id.name);
			
			// in case a function comes after an identifier,
			// remove the identifier
			var identifierIndex = identifiers.indexOf(node.id.name);
			if (identifierIndex !== -1) {
				identifiers.splice(identifierIndex, 1);
			}
		}
	}
	
	var functionScope = scope.slice(0);
	
	for (var i = 0, len = node.params.length; i < len; i++) {
		var param = node.params[i];
		if (param.type === 'Identifier') {
			if (functionScope.indexOf(param.name) === -1) {
				functionScope.push(param.name);
			}
		} else {
			console.log('unknown function param type ' + param.type);
		}
	}
	
	this.parse(node.body, functionScope, identifiers);
};

window.AutoInjectorParser.parseBlockStatement = function (node, scope, identifiers) {
	var blockScope = scope.slice(0);
	for (var i = 0, len = node.body.length; i < len; i++) {
		this.parse(node.body[i], blockScope, identifiers);
	}
};

window.AutoInjectorParser.parseVariableDeclaration = function (node, scope, identifiers) {
	for (var i = 0, len = node.declarations.length; i < len; i++) {
		this.parse(node.declarations[i], scope, identifiers);
	}
};

window.AutoInjectorParser.parseVariableDeclarator = function (node, scope, identifiers) {
	if (scope.indexOf(node.id.name) === -1) {
		scope.push(node.id.name);
	}
	
	this.parse(node.init, scope, identifiers);
};

window.AutoInjectorParser.parseAssignmentExpression = function (node, scope, identifiers) {
	if (node.left.type === 'Identifier') {
		if (scope.indexOf(node.left.name) === -1) {
			scope.push(node.left.name);
		}
	} else {
		this.parse(node.left, scope, identifiers);
	}
	
	this.parse(node.right, scope, identifiers);
};

window.AutoInjectorParser.parseCallExpression = function (node, scope, identifiers) { 
	this.parse(node.callee, scope, identifiers);
	for (var i = 0, len = node.arguments.length; i < len; i++) {
		this.parse(node.arguments[i], scope, identifiers);
	}
};

window.AutoInjectorParser.parseMemberExpression = function (node, scope, identifiers) {
	this.parse(node.object, scope, identifiers);
};

window.AutoInjectorParser.parseIdentifier = function (node, scope, identifiers) {
	if (identifiers.indexOf(node.name) === -1
		&& scope.indexOf(node.name) === -1
		&& typeof window[node.name] === 'undefined') {
		identifiers.push(node.name);
	}
};

window.AutoInjectorParser.parseObjectExpression = function (node, scope, identifiers) {
	for (var i = 0, len = node.properties.length; i < len; i++) {
		this.parse(node.properties[i], scope, identifiers);
	}
};

window.AutoInjectorParser.parseProperty = function (node, scope, identifiers) {
	this.parse(node.value, scope, identifiers);
};

window.AutoInjectorParser.parseBinaryExpression = function (node, scope, identifiers) {
	this.parse(node.left, scope, identifiers);
	this.parse(node.right, scope, identifiers);
};

window.AutoInjectorParser.parseIfStatement = function (node, scope, identifiers) {
	this.parse(node.test, scope, identifiers);
	
	if (node.consequent) {
		var consequentScope = scope.slice(0);
		this.parse(node.consequent, consequentScope, identifiers);
	}
	
	if (node.alternate) {
		var alternateScope = scope.slice(0);
		this.parse(node.alternate, alternateScope, identifiers);
	}
};

window.AutoInjectorParser.parseUnaryExpression = function (node, scope, identifiers) {
	this.parse(node.argument, scope, identifiers);
};

window.AutoInjectorParser.parseArrayExpression = function (node, scope, identifiers) {
	for (var i = 0, len = node.elements.length; i < len; i++) {
		this.parse(node.elements[i], scope, identifiers);
	}
};

window.AutoInjectorParser.parseConditionalExpression = function (node, scope, identifiers) {
	this.parse(node.alternate, scope, identifiers);
	this.parse(node.consequent, scope, identifiers);
	this.parse(node.test, scope, identifiers);	
};

window.AutoInjectorParser.parseNewExpression = function (node, scope, identifiers) {
	this.parse(node.callee, scope, identifiers);
	for (var i = 0, len = node.arguments.length; i < len; i++) {
		this.parse(node.arguments[i], scope, identifiers);
	}	
};

window.AutoInjectorParser.parseForStatement = function(node, scope, identifiers) {
	this.parse(node.init, scope, identifiers);
	this.parse(node.test, scope, identifiers);
	this.parse(node.update, scope, identifiers);
	
	var bodyScope = scope.slice(0);
	this.parse(node.body, bodyScope, identifiers);
};


window.AutoInjectorParser.parseSwitchStatement = function (node, scope, identifiers) { 
	this.parse(node.discriminant, scope, identifiers);
	
	for (var i = 0, len = node.cases.length; i < len; i++) {
		var caseScope = scope.slice(0);
		this.parse(node.cases[i], caseScope, identifiers);
	}
};

window.AutoInjectorParser.parseSwitchCase = function (node, scope, identifiers) {
	this.parse(node.test, scope, identifiers);
	
	for (var i = 0, len = node.consequent.length; i < len; i++) {
		this.parse(node.consequent[i], scope, identifiers);
	}
};