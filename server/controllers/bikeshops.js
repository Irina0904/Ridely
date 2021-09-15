var express = require('express');
const app = require('../app');
var router = express.Router();
var Bikeshop = require('../models/bikeshops');
var mongoose = require('mongoose');

//POST
router.post('/api/bikeshops', function(req, res, next){
    try{
        var bikeshops = new Bikeshop(req.body);
    }catch{
        return next(err);
    }

    bikeshops.save(function(err, bikeshops) {
        if (err) { return next(err); }
        res.status(201).json(bikeshops)
    })
});

//GET ALL
router.get('/api/bikeshops', function(req, res, next){
    
    Bikeshop.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    
       
});

//DELETE ALL
router.delete('/api/bikeshops', function(req, res, next){
    Bikeshop.remove({}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json();
    })
});

//DELETE SPECIFIC
router.delete('/api/bikeshops/:id', function(req, res, next){
    Bikeshop.remove({_id: req.params.id}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json(Bikeshop);
    })
});


//PUT
router.put('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndReplace({_id: req.params.id}, 
        req.body, {new: true},
    function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
});
//PATCH
router.patch('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndUpdate({_id: req.params.id}, 
        req.body, {new: true},
    function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    });

//GET SPECIFIC
router.get('/api/bikeshops/:id', function(req, res, next){
    
    Bikeshop.findOne({ _id: req.params.id }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });

});

module.exports = router;
