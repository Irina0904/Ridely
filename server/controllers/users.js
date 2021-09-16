var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});

router.get('/api/users', function(req, res, next){

    User.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
    });

    router.get('/api/users/:user_id', function(req, res, next){

        User.findOne({_id: req.params.user_id}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json(result);
            }
          });
        });
        router.put('/api/users/:user_id', function(req, res, next){

            User.findOneAndReplace({_id: req.params.user_id}, 
                req.body, {new: true},
            function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                  res.status(200).send(result);
                }
              });
            });
        
        router.patch('/api/users/:user_id', function(req, res, next){

            User.findOneAndUpdate({_id: req.params.user_id}, 
                {$set: {address:req.body.address}},{new: true},
            function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(result);
                }
              });
            });

router.delete('/api/users', function(req, res, next){
    User.remove({}, function(err, user) {
        if (err) { return next(err); }
        res.status(204).json(user);
    })
});

router.delete('/api/users/:user_id', function(req, res, next){
    User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err) { return next(err); }
        res.status(204).json(user);
    })
});

module.exports = router; 

