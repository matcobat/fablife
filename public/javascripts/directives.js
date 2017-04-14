/* Directives */
(function() {
    'use strict';
    var app = angular.module('fablife');


    app.directive('mainView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/main.html',
            controller: 'mainController'
        };
    });



})();
