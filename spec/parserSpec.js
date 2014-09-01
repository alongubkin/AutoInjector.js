describe("AutoInjectorParser", function () {

	it("should get identifiers in a FunctionExpression node", function () {
		var code = 'function fn() {\
						var f = function (a) { p.doSomething() }\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].declarations[0].init;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
	it("should get identifiers in a FunctionDeclaration node", function () {
		var code = 'function fn() {\
						function f(a) { p.doSomething() }\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});

	it("should get identifiers in a BlockStatement node", function () {
		var code = 'function fn() {\
						{ p.doSomething() }\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});	
	
 	it("should get identifiers in a VariableDeclaration node", function () {
		var code = 'function fn() {\
						var a = 5, b = p;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
	
 	it("should get identifiers in an ExpressionStatement node", function () {
		var code = 'function fn() {\
						p;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in an AssignmentExpression node", function () {
		var code = 'function fn() {\
						a = p;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in a CallExpression node", function () {
		var code = 'function fn() {\
						p.doSomething(a, b, c);\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(4);
		expect(identifiers).toContain('p', 'a', 'b', 'c');			
	});
	
 	it("should get identifiers in a MemberExpression node", function () {
		var code = 'function fn() {\
						p.c;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in an ObjectExpression node", function () {
		var code = 'function fn() {\
						var a = { a: p, b: 5 }\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].declarations[0].init;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});

 	it("should get identifiers in a BinaryExpression node", function () {
		var code = 'function fn() {\
						var a = p & 5;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].declarations[0].init;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in a LogicalExpression node", function () {
		var code = 'function fn() {\
						var a = p && 5;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].declarations[0].init;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in an IfStatement node", function () {
		var code = 'function fn() {\
						if (p) {}\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in an UnaryExpression node", function () {
		var code = 'function fn() {\
						!p\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});
	
 	it("should get identifiers in a ReturnStatement node", function () {
		var code = 'function fn() {\
						return p;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});

 	it("should get identifiers in an UpdateStatement node", function () {
		var code = 'function fn() {\
						p++;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});

 	it("should get identifiers in a ThrowStatement node", function () {
		var code = 'function fn() {\
						throw p;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(1);
		expect(identifiers).toContain('p');			
	});

 	it("should get identifiers in an ArrayExpression node", function () {
		var code = 'function fn() {\
						[p, 1, b];\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(2);
		expect(identifiers).toContain('p', 'b');			
	});

 	it("should get identifiers in a ConditionalExpression node", function () {
		var code = 'function fn() {\
						a ? b : c;\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(3);
		expect(identifiers).toContain('a', 'b', 'c');			
	});

 	it("should get identifiers in a NewExpression node", function () {
		var code = 'function fn() {\
						new A(b);\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0].expression;
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(2);
		expect(identifiers).toContain('A', 'b');			
	});
	
 	it("should get identifiers in a ForStatement node", function () {
		var code = 'function fn() {\
						for (a; b; c) {}\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(3);
		expect(identifiers).toContain('a', 'b', 'c');			
	});
	
 	it("should get identifiers in a SwitchStatement node and a SwitchCase node", function () {
		var code = 'function fn() {\
						switch (a) {\
							case b:\
								c;\
								break;\
							default:\
								d;\
								break;\
						}\
					}';
					
		var node = esprima.parse(code)
			.body[0].body.body[0];
		
		var identifiers = [];
		AutoInjectorParser.parse(node, [], identifiers);
		
		expect(identifiers.length).toBe(4);
		expect(identifiers).toContain('a', 'b', 'c', 'd');			
	});	
});