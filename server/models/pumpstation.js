var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pumpstationSchema = new Schema({
    name:{type: String},
    address:{
        city: String,
        street: String,
        zip_code: String},
    rating: {type: Number}

});

module.exports = mongoose.model('pumpstation', pumpstationSchema);
