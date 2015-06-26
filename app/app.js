'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
	'ngRoute',
	'app.demo',
]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/'});
	}]);
