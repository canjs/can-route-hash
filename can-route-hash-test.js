var canReflect = require('can-reflect');
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
	var teardown = helpers.setup(function(RouteHash){
		var hash = new RouteHash();
		canReflect.onValue(hash, function(){
			QUnit.ok(true, "it worked");
			teardown();
		});
		hash.value = "foo/bar";
	});
});
