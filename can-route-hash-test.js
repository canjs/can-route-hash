var QUnit = require('steal-qunit');
var helpers = require("./test/helpers");

QUnit.module('can-route-hash');

QUnit.test('Basics', function(){
	var teardown = helpers.setup(function(RouteHash){
		var hash = new RouteHash();

		QUnit.equal(hash.value, "", "read as empty");

		hash.value = "foo/bar";

		QUnit.equal(hash.value, "foo/bar");
		teardown();
	});
});

QUnit.test('Event handlers are called', function(){
	var teardown = helpers.setup(function(RouteHash, canReflect){
		var hash = new RouteHash();
		canReflect.onValue(hash, function(){
			QUnit.ok(true, "it worked");
			teardown();
		});
		hash.value = "foo/bar";
	});
});

QUnit.test("test both sides of live binding", function(){


	var teardown = helpers.setup(function(RouteHash, canReflect, win){

		// routeHash is initialized to window's hash
		win.location.hash = "#!foo";
		var routeHash = new RouteHash();

		QUnit.equal(routeHash.value, "foo");


		var next;
		// Setup a binding
		var bindingChanges = [];
		canReflect.onValue( routeHash, function(newVal){
			bindingChanges.push(newVal);
			next();
		});

		next = function(){
			next = function(){
				QUnit.deepEqual(bindingChanges,["bar","zed"],"dispatched events");
				teardown();
			};
			// Updating the observable changes the hash
			routeHash.value = "zed";
			QUnit.equal(win.location.hash, "#!zed");
		};


		// Updating the hash changes the observable
		win.location.hash = "#!bar";
		QUnit.equal(routeHash.value, "bar");

	});
});
