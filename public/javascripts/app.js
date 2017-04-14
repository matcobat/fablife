(function() {
    'use strict';

    var app = angular.module('fablife', [
        'ui.router',
        'ngResource'
    ]);

    app.config(
        [
            '$stateProvider', '$urlRouterProvider',

            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/home");

                $stateProvider.state('my-apps', {
                    templateUrl: 'views/home.html',
                    url: '/home',
                    controller: 'homeController'
                });


            }

        ]);

})();
