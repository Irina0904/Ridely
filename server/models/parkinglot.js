var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parkinglotSchema = new Schema({
    parking_lotId: Schema.Types.ObjectId,
    address:{
        city: String,
        street: String,
        zip_code: String},
    added_by: {type: Schema.Types.ObjectId, ref: 'users'}
    

}, 
{collection: "parkinglots_collection"});

const Parkinglot = module.exports = mongoose.model('parkinglots', parkinglotSchema);
