const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Keyword = new Schema ({
	keyword: {type: String, required: true},
	group: {type: String, required: true},
	score: {type: String, required: true}
});

module.exports = mongoose.model('word', Keyword);