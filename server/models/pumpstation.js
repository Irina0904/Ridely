
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pumpstationSchema = new Schema({
    name:{type: String},
    adress: {type: String},
    rating: {type: Number}

})