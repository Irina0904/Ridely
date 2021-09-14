
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pumpstationSchema = new Schema({
    name:{type: String},
    address: {type: String},
    rating: {type: Number}

});

module.exports = mongoose.model('pumpstation', pumpstationSchema);

