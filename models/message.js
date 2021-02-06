var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const { DateTime } = require("luxon");

let MessageSchema = new Schema({
    title: {type: String, maxlength: 50, required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    text: {type: String, maxlength: 250, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},

});

MessageSchema
.virtual('date_formated')
.get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Message', MessageSchema);
