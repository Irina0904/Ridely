var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeshopSchema = new Schema({
    bikeshop_id: Schema.Types.ObjectId,
    name:String,
    owner: String,
    address: { city: String, street: String},
    rating: Number,
    opening_hours: {start: Number, end: Number},
    added_by: {type: Schema.Types.ObjectId, ref:'users'}

});

//bikeshopSchema.index({'$**': 'text'});

module.exports = mongoose.model('bikeshops', bikeshopSchema);