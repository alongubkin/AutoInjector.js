AutoInjector.js
===

Automatic DI for frameworks like Angular.js. Fully tested!

### What?

Ever encountered a long dependency list in your Angular controller or service? 

For example:

	app.controller('MyCtrl', function ($scope, 
									   $timeout, 
									   $state,
									   $stateParams,
									   $localStorage,
									   $ionicPlatform,
									   $ionicModal,
									   $ionicPopup,
									   LoginService,
									   MessageService) {
		...
	});

**AutoInjector.js** solves that by turning it into:

	app.controller('MyCtrl', $inject(function MyCtrl() {
		...
	}));
									   
### Install

`bower install autoinjector`


### How to use

Simply call `$inject` on any controller, service, directive, config or filter function:

	app.controller('MyCtrl', $inject(function MyCtrl() {
		// MyService will be injected automatically
		// simply because it is being used.
		MyService.doSomething();
	});

Note that the anonymous function that's passed to `$inject` **must have a name**, like in the example.

### How does it work?

AutoInjector uses [Esprima](http://esprima.org/) to build a syntax tree from the function that's passed to `$inject`. It then scans the tree for undefined identifiers. If an identifier is defined in the function itself, or in the global scope - it is ignored.  

After building a list of identifiers, AutoInjector rewrites the function using the list of identifiers as the function parameters. `$inject` returns that function, which is then passed back to the framework.
