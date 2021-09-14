var express = require('express');
const app = require('../app');
var router = express.Router();
var Bikeshop = require('../models/bikeshop');
var mongoose = require('mongoose');


router.post('/api/bikeshop', function(req, res, next){
    try{
        var bikeshop = new Bikeshop(req.body);
    }catch{
        return next(err);
    }

    bikeshop.save(function(err, bikeshop) {
        if (err) { return next(err); }
        res.status(201).json(bikeshop)
    })
});


router.get('/api/bikeshop', function(req, res, next){
    
    Bikeshop.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    
       
});


router.delete('/api/bikeshop', function(req, res, next){
    Bikeshop.remove({}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json();
    })
});


router.delete('/api/bikeshop/:id', function(req, res, next){
    Bikeshop.remove({_id: req.params.id}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json(Bikeshop);
    })
});





router.put('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndUpdate({_id: req.params.id}, 
        req.body,
    function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
});




router.get('/api/bikeshop/:id', function(req, res, next){
    
    Bikeshop.findOne({ _id: req.params.id }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });

});




module.exports = router;

