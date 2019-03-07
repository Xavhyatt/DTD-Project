const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Report = new Schema ({
	nameOfFile: {type: String, required: true},
	wordCount: {type: Number},
	numberOfThreatWordsFound: {type: Number},
	exactMatches: {type: Array},
	partialMatches: {type: Array}
});

module.exports = mongoose.model('report', Report);