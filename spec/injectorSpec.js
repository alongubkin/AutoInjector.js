describe("$inject", function () {
	var myService = { doSomething: function () { return 5; } };

	
	it("should call the function successfully", function () {
		var result = $inject(function fn() {
			return myService.doSomething();
		})(myService);
		
		expect(result).toBe(5);
	});
});