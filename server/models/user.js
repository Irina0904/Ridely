
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String},
    email: {type: String},
    //registration_date: {type: Date.now().String},
    additions: {type: [Schema.Types.ObjectId]}
    


});

const User = module.exports = mongoose.model('user', userSchema);
