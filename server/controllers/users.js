var express = require('express');
var router = express.Router();
var User = require('../models/user');
const app = require('../app');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var jsonParser = bodyParser.json()


router.post('/api/users', function(req, res, next){
    try{
        var users = new User(req.body);
    }catch{
        return next(err);
    }
    users.save(function(err, users) {
        if (err) { return next(err); }
        res.status(201).json(users)
    })
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

    User.findOneAndUpdate({_id: req.params.id}, {$push: {'additions': mongoose.Types.ObjectId(req.body.parking_lotId)}}, function(err, result){
        if(err) {
            res.status(404).json()
        }else{
            res.status(201).json(result);
        }

    })

});

router.delete('/api/users', function(req, res, next){
    User.remove({}, function(err, users) {
        if (err) { return next(err); }
        res.status(204).json(users);
    })
});

router.delete('/api/users/:id', function(req, res, next){
    User.remove({ _id: req.params.id }, function(err, users) {
        if (err) { return next(err); }
        res.status(204).json(users);
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

    User.findOneAndUpdate({_id: req.params.id}, {$push: {'additions': mongoose.Types.ObjectId(req.body.bikeshop_id)}}, function(err, result){
        if(err) {
            return next(err);
        }else{
            res.status(201).json(result);
        }

    })

});

router.post('/api/users/:id/parkinglot', function(req, res, next){

    User.findOneAndUpdate({_id: req.params.id}, {$push: {'additions': mongoose.Types.ObjectId(req.body.parking_lotId)}}, function(err, result){
        if(err) {
            return next(err);
        }else{
            res.status(201).json(result);
        }

    })

});
//PUT
router.put('/api/users/:id', function(req, res, next){

    User.findOneAndReplace({_id: req.params.id}, 
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
router.patch('/api/users/:id', function(req, res, next){

User.findByIdAndUpdate({_id: req.params.id}, 
    req.body, {new: true},
function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
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
    User.findOneAndUpdate({_id: req.params.id}, {$unset:{ additions:{ObjectId: req.params.additions_id}}},  function(err, result){
        if(err) {
            return next(err);
        }else{
            res.status(204).json(result);
        }

    })

});


router.post('/api/login',  function(req, res, next){

    User.findOne({email: req.body.email, password: req.body.password}, function(err, result){
        if(err) {
            res.status(404).json()
        }
        if(result){
            console.log(req.body)
            res.status(200).json(result)
        }else{
            res.status(404).json()

        }

})
});

module.exports = router; 
