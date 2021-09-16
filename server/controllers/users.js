var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');





router.post('/api/users', function(req, res, next){
    try{
        var user = new User(req.body);
    }catch{
        res.status(404).json()
    }

    user.save(function(err, user) {
        if (err) { res.status(404).json() }
        res.status(201).json(user)
    })
});

router.delete('/api/users', function(req, res, next){
    User.remove({}, function(err, user) {
        if (err) { res.status(404).json() }
        res.status(204).json(user);
    })
});

router.delete('/api/users/:id', function(req, res, next){
    User.remove({ _id: req.params.id }, function(err, user) {
        if (err) { res.status(404).json() }
        res.status(204).json(user);
    })
});

router.get('/api/users', function(req, res, next){
    
    User.find({}, function(err, result) {
        if (err) {
            res.status(404).json()
        } else {
          res.status(200).json(result);
        }
      });
    
       
});


router.patch('/api/users/:id', function(req, res, next){

    User.findOneAndUpdate({_id: req.params.id}, 
        req.body, {new: true},
    function(err, result) {
        if (err) {
            res.status(404).json()
        } else {
          res.status(200).json(result);
        }
      });
    });



router.post('/api/users/:id/bikeshops', function(req, res, next){

    User.findOneAndUpdate({_id: req.params.id}, {$push: {'additions': mongoose.Types.ObjectId(req.body.bikeshop_id)}}, function(err, result){
        if(err) {
            res.status(404).json()
        }else{
            res.status(201).json(result);
        }

    })

});

router.post('/api/users/:id/parkinglots', function(req, res, next){

    User.findOneAndUpdate({_id: req.params.id}, {$push: {'additions': mongoose.Types.ObjectId(req.body.parkinglot_id)}}, function(err, result){
        if(err) {
            res.status(404).json()
        }else{
            res.status(201).json(result);
        }

    })

});

router.get('/api/users/:id/additions/:additions_id', function(req, res, next){


    User.find({_id: req.params.id}, {additions: req.params.additions_id},  function(err, result){
        if(err) {
            res.status(404).json()
        }else{
            res.status(200).json(result);
        }

    })

});

router.get('/api/users/:id', function(req, res, next){


    User.find({_id: req.params.id}, function(err, result){
        if(err) {
            res.status(404).json()
        }else{
            res.status(200).json(result);
        }

    })

});

router.delete('/api/users/:id/additions/:additions_id', function(req, res, next){


    User.findOneAndUpdate({_id: req.params.id}, {$unset:{ additions: req.params.additions_id}},  function(err, result){
        if(err) {
            res.status(404).json()
        }else{
            res.status(204).json(result);
        }

    })

});

router.put('/api/users/:id', function(req, res, next){

    User.findOneAndReplace({_id: req.params.id}, 
        req.body,
    function(err, result) {
        if (err) {
            res.status(404).json()
        } else {
          res.status(200).json(result);
        }
      });
});




module.exports = router; 