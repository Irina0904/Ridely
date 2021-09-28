
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pumpstationSchema = new Schema({
    pumpstation_id: Schema.Types.ObjectId,
    name: String,
    address: {city: String, street: String, zipcode: Number},
    rating: Number,
    added_by: {type: Schema.Types.ObjectId, ref:'users'},
    bike_service_tools: [{ type: Schema.Types.ObjectId, ref: 'bike_service_tools' }]

});

pumpstationSchema.index({'$**': 'text'});

module.exports = mongoose.model('pumpstations', pumpstationSchema);
