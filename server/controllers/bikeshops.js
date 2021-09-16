var express = require('express');
const app = require('../app');
var router = express.Router();
var Bikeshop = require('../models/bikeshop');
var mongoose = require('mongoose');



router.post('/api/bikeshops', function(req, res, next){
    try{
        var bikeshop = new Bikeshop(req.body);
    }catch{
        res.status(404).json()
    }

    bikeshop.save(function(err, bikeshop) {
        if (err) { res.status(404).json() }
        res.status(201).json(bikeshop)
    })
});


router.get('/api/bikeshops', function(req, res, next){
    
// GET URL : http://localhost:3000/api/bikeshops?adress=mingata20

        try{
            var query = Bikeshop.find();

        for (var fieldName in req.query)
        {
            if(req.query.hasOwnProperty(fieldName))  
            {
                if(req.query[fieldName])  
                {
                    query.where(fieldName).equals(req.query[fieldName]);
                }
            }
        }
        
        query.exec(function(err,data){
            if(err) { return next(err); }
            res.status(200).json(data)
        });  
    }catch(error){
        res.status(404).json()
    }
       
});


router.delete('/api/bikeshops', function(req, res, next){
    Bikeshop.remove({}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json();
    })
});


router.delete('/api/bikeshops/:id', function(req, res, next){
    Bikeshop.remove({_id: req.params.id}, function(err, Bikeshop) {
        if (err) { return res.status(404).json() }
        res.status(204).json(Bikeshop);
    })
});

router.patch('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndUpdate({_id: req.params.id}, 
        req.body, {new: true},
    function(err, result) {
        if (err) {
          res.status(404).json()
        } else {
          res.status(200).json(result);
        }
      });
    });




router.put('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndUpdate({_id: req.params.id}, 
        req.body,
    function(err, result) {
        if (err) {
          res.status(404).json()
        } else {
          res.status(200).json(result);
        }
      });
});




router.get('/api/bikeshops/:id', function(req, res, next){
    
    Bikeshop.findOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.status(404).json()
        } else {
          res.status(200).json(result);
        }
      });

});




module.exports = router;

