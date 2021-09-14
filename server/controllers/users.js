var express = require('express');
var router = express.Router();
var User = require('../models/user');
const app = require('../app');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');





router.post('/api/users', function(req, res, next){
    try{
        var user = new User(req.body);
    }catch{
        return next(err);
    }

    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user)
    })
});

router.delete('/api/user', function(req, res, next){
    User.remove({}, function(err, user) {
        if (err) { return next(err); }
        res.status(204).json(user);
    })
});

router.delete('/api/user/:id', function(req, res, next){
    User.remove({ _id: req.params.id }, function(err, user) {
        if (err) { return next(err); }
        res.status(204).json(user);
    })
});

router.get('/api/users', function(req, res, next){
    
    User.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    
       
});



router.post('/api/users/:id/bikeshop', function(req, res, next){

    User.findOneAndUpdate({_id: req.params.id}, {$set: {'additions': mongoose.Types.ObjectId(req.body.bikeshop_id)}}, function(err, result){
        if(err) {
            return next(err);
        }else{
            res.status(201).json(result);
        }

    })

});

router.get('/api/users/:id/additions/:additions_id', function(req, res, next){


    User.find({_id: req.params.id}, {additions: req.params.additions_id},  function(err, result){
        if(err) {
            return next(err);
        }else{
            res.status(200).json(result);
        }

    })

});

router.delete('/api/users/:id/additions/:additions_id', function(req, res, next){


    User.findOneAndUpdate({_id: req.params.id}, {$unset:{ additions: req.params.additions_id}},  function(err, result){
        if(err) {
            return next(err);
        }else{
            res.status(204).json(result);
        }

    })

});



module.exports = router; 