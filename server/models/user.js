var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    gmail: String,
    password: String

});

module.exports = mongoose.model('users', userSchema);
