var express = require('express');
var request = require('request');
var _ = require('underscore');
var router = express.Router();
var Q = require('q');

/* GET users listing. */
router.get('/bundles', function(req, res, next) {
    request.get('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE, {
        'auth': {
            'bearer': process.env.TOKEN
        }
    }, function(error, response, body) {
        res.json(JSON.parse(body));
    });
});

router.get('/descriptors', function(req, res, next) {
    request.get('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/descriptors', {
        'auth': {
            'bearer': process.env.TOKEN
        }
    }, function(error, response, body) {
        if (error) {
            res.send(500, error);
        } else if (response.statusCode != 200) {
            res.send(response.statusCode, response.statusMessage);
        } else {
            var descriptors = JSON.parse(body);
            res.json(descriptors);
        }
    });
});

router.post('/salus', function(req, res, next) {
    request.post('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/salus', {
        'auth': {
            'bearer': process.env.TOKEN
        },
        json: req.body
    }, function(error, response, body) {
        if (error) {
            res.send(500, error);
        } else if (response.statusCode != 200) {
            res.send(response.statusCode, response.statusMessage);
        } else {
            res.json(body);
        }
    });
});

router.get('/profile', function(req, res, next) {
    request.get('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/profiles', {
        'auth': {
            'bearer': process.env.TOKEN
        }
    }, function(error, response, body) {
        if (error) {
            res.send(500, error);
        } else if (response.statusCode != 200) {
            res.send(response.statusCode, response.statusMessage);
        } else {
            var descriptors = JSON.parse(body);
            res.json(descriptors);
        }
    });
});

router.post('/profile', function(req, res, next) {
    var profile = req.body;


    request.post('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/profile', {
        'auth': {
            'bearer': process.env.TOKEN
        },
        json: { name: profile.name, description: profile.description }
    }, function(error, response, body) {
        if (error) {
            res.send(500, error);
        } else if (response.statusCode != 200) {
            res.send(response.statusCode, response.statusMessage);
        } else {
            var promesses = [];
            _.each(profile.descriptors, function(descriptor) {
                var deferred = Q.defer();
                promesses.push(deferred.promise);
                request.post('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/profile/' + body.slug + '/profileDescriptor', {
                    'auth': {
                        'bearer': process.env.TOKEN
                    },
                    json: { name: descriptor.name, value: descriptor.value }
                }, function() {
                    deferred.resolve();
                });
            });
            Q.all(promesses).then(function() {
                res.json(body);
            });
        }
    });


});

router.post('/profile/:slug', function(req, res, next) {
    var profile = req.body;


    var promesses = [];
    _.each(profile.descriptors, function(descriptor) {
        var deferred = Q.defer();
        promesses.push(deferred.promise);
        request.put('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/profile/' + profile.slug + '/profileDescriptor/' + descriptor.slug, {
            'auth': {
                'bearer': process.env.TOKEN
            },
            json: { name: descriptor.name, value: descriptor.value }
        }, function() {
            deferred.resolve();
        });
    });
    Q.all(promesses).then(function() {
        res.json(profile);
    });


});

router.get('/profileDescriptor/:profileSlug', function(req, res, next) {
    request.get('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/profile/' + req.params.profileSlug + '/profileDescriptors', {
        'auth': {
            'bearer': process.env.TOKEN
        }
    }, function(error, response, body) {
        if (error) {
            res.send(500, error);
        } else if (response.statusCode != 200) {
            res.send(response.statusCode, response.statusMessage);
        } else {
            var descriptors = JSON.parse(body);
            res.json(descriptors);
        }
    });
});

module.exports = router;
