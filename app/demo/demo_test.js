'use strict';

describe('app module', function() {

	beforeEach(module('app.demo'));

	describe('demo service', function(){
		var DemoService, httpBackend;
		beforeEach(inject( function( _DemoService_, _$httpBackend_ ) {
			DemoService = _DemoService_;
			httpBackend = _$httpBackend_;
		}));
		afterEach( function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});
		it( 'should make a get request to /demo/api/data when calling getData', function() {
			DemoService.getData();
			httpBackend.expectGET( '/demo/api/data.json' ).respond( { } );
			httpBackend.flush();
		});
	});

	describe('demo controller', function(){
		var scope, DemoController, DemoService, expectedData;

		function makeFakeCall(expectedReturn){
            return function(){
                return  {
                    success : function(callback){
                        callback(expectedReturn);
                        return this;
                    },
					error : function(callback){
                        callback("ERROR");
                        return this;
					}
                };
            };
        }

		beforeEach(inject(function($rootScope, $controller, _DemoService_) {
			scope = $rootScope.$new();
			DemoService = _DemoService_;
			expectedData = [];
			DemoController = $controller('DemoController', {
				$scope : scope,
				DemoService : DemoService
			});
		}));
		it('should call DemoService getData method when calling fetchData', function(){ 
			spyOn(DemoService, 'getData').and.callFake(makeFakeCall(expectedData));
			scope.fetchData();
			expect(DemoService.getData).toHaveBeenCalled();
		});
		it('should return expectedData when calling fetchData', function(){ 
			expectedData = [{ value : "value1" }];
			spyOn(DemoService, 'getData').and.callFake(makeFakeCall(expectedData));
			scope.fetchData();
			expect(DemoService.getData).toHaveBeenCalled();
			expect(scope.data).toEqual(expectedData);
		});
		it('should keep scope.data undefined when fetchData return an error', function(){ 
			spyOn(DemoService, 'getData').and.callFake(makeFakeCall());
			scope.fetchData();
			expect(DemoService.getData).toHaveBeenCalled();
			expect(scope.data).toEqual(undefined);
		});
	});

});
