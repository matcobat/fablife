(function() {
    'use strict';

    var app = angular.module('fablife');


    app.service('Descriptor', function($resource) {
        return $resource('/api/salus/descriptors/:slug', { slug: '@slug' });
    });

    app.service('Salus', function($resource) {
        return $resource('/api/salus/salus');
    });

    app.service('Profile', function($resource) {
        return $resource('/api/salus/profile/:slug', { slug: '@slug' });
    });

    app.service('ProfileDescriptor', function($resource) {
        return $resource('/api/salus/profileDescriptor/:slug', { slug: '@slug' });
    });






})();
