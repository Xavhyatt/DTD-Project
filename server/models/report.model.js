const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReportSchema = new Schema ({
	nameOfFile: {type: String, required: true},
	wordCount: {type: Number, required: true},
	numberOfThreatWordsFound: {type: Number, required: true},
	exactMatches: {type: Array},
	partialMatches: {type: Array}
});

module.exports = mongoose.model('Report', ReportSchema);