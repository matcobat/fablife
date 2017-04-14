var express = require('express');
var request = require('request');
var _ = require('underscore');
var router = express.Router();

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
        var descriptors = JSON.parse(body);
        res.json(descriptors);
    });
});

router.post('/salus', function(req, res, next) {
    request.post('http://api.salus.fablife.com:10010/bundle/' + process.env.BUNDLE + '/salus', {
        'auth': {
            'bearer': process.env.TOKEN
        },
        form: req.body
    }, function(error, response, body) {
        console.log(body);
        
        console.log(error);
        if (error) {
            res.send(500, error);
            
        } else {
            var parameters = JSON.parse(body);
            res.json(parameters);
        }
    });
});

module.exports = router;
