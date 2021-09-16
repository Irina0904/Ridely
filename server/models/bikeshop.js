var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeshopSchema = new Schema({
    bikeshop_id: Schema.Types.ObjectId,
    name:String,
    address: { city: String, street: String, zipcode: Number },
    rating: Number,
    opening_hours: {start: Number, end: Number},
    added_by: {type: Schema.Types.ObjectId, ref:'users'}

});

module.exports = mongoose.model('bikeshops', bikeshopSchema);