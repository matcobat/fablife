/* Controllers */
(function() {
    'use strict';
    var app = angular.module('fablife');



    app.controller('homeController', function(
        $scope,Descriptor, Salus) {
    	$scope.descriptors = Descriptor.query();


    	$scope.send = function(){
    		Salus.save($scope.descriptors);
    	};

    });


})();
