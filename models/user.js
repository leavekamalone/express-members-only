var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let UserSchema = new Schema ({
    first_name: {type: String, required: true, maxlength: 100},
    last_name: {type: String, required: true, maxlength: 100},
    user_name: {type: String, lowercase: true, maxlength: 10, index: true},
    password: {type: String, required: true, maxlength: 100},
    member_status: {type: Boolean},
});

module.exports = mongoose.model('User', UserSchema);


