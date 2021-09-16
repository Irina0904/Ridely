var express = require('express');
const app = require('../app');
var mongoose = require('mongoose');

var router = express.Router();
var Pumpstation = require('../models/pumpstation');




router.post('/api/pumpstations', function(req, res, next){
    var pumpstation = new Pumpstation(req.body);
    pumpstation.save(function(err, pumpstation) {
        if (err) { res.status(404).json() }
        res.status(201).json(pumpstation);
    })
});

router.get('/api/pumpstations', function(req, res, next){

    Pumpstation.find({}, function(err, result) {
        if (err) {
            res.status(404).json()
        } else {
          res.json(result);
        }
    });
});

router.get('/api/pumpstations/:pumpstation_id', function(req, res, next){

        Pumpstation.findOne({_id: req.params.pumpstation_id}, function(err, result) {
            if (err) {
                res.status(404).json()
            } else {
              res.status(200).json(result);
            }
        });
});

router.put('/api/pumpstations/:pumpstation_id', function(req, res, next){

    Pumpstation.findOneAndReplace({_id: req.params.pumpstation_id}, 
        req.body, {new: true},
        function(err, result) {
            if (err) {
                res.status(404).json()
            } else {
                res.status(200).send(result);
            }
        });
});
        
router.patch('/api/pumpstations/:pumpstation_id', function(req, res, next){

    Pumpstation.findOneAndUpdate({_id: req.params.pumpstation_id}, 
        req.body, {new: true},
        function(err, result) {
        if (err) {
            res.status(404).json()
        } else {
            res.json(result);
        }
    });
});


router.delete('/api/pumpstations', function(req, res, next){
    Pumpstation.remove({}, function(err, pumpstation) {
        if (err) { res.status(404).json() }
            res.status(204).json(pumpstation);
        })
});
            
router.delete('/api/pumpstations/:pumpstation_id', function(req, res, next){
    Pumpstation.remove({ _id: req.params.pumpstation_id }, function(err, pumpstation) {
        if (err) { res.status(404).json() }
        res.status(204).json(pumpstation);
        })
});
            
 module.exports = router;