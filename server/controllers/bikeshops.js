var express = require('express');
const app = require('../app');
var router = express.Router();
var Bikeshop = require('../models/bikeshop');

router.post('/api/bikeshop', function(req, res, next){
    var bikeshop = new Bikeshop(req.body);

    bikeshop.save(function(err, bikeshop) {
        if (err) { return next(err); }
        res.status(201).json(bikeshop);
    })
});

module.exports = router;

