'use strict';

angular.module('app.demo', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'demo/demo.html',
			controller: 'DemoController'
		});
	}])

	.factory('DemoService', ['$http', function($http){
	
		return {
			getData : function(){
				return $http.get('/demo/api/data.json');
			}
		};
	
	}])

	.controller('DemoController', ['$scope', 'DemoService', function($scope, DemoService) {
		$scope.fetchData = function(){
			DemoService.getData()
				.success(function(data){
					$scope.data = data;
				})
				.error(function(data){});
		};

		$scope.fetchData();
	}]);
