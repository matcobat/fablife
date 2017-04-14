(function() {
    'use strict';

    var app = angular.module('fablife');


    app.service('Descriptor', function($resource) {
        return $resource('/api/salus/descriptors/:slug', { slug: '@slug' });
    });

    app.service('Salus', function($resource) {
        return $resource('/api/salus/salus');
    });

    

 


})();
