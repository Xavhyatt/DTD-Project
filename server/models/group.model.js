const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Group = new Schema ({
	group: {type: String, required: true},
	userid: {type: String, required: false}
});

module.exports = mongoose.model('group', Group);