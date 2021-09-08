
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeshopSchema = new Schema({
    name:{type: String},
    adress: {type: String},
    rating: {type: Number}

});

module.exports = mongoose.model('bikeshops', bikeshopSchema);