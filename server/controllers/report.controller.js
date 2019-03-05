const Report = require('../models/report.model');

exports.report_create = function (req, res) {

    let report = new Report({
        nameOfFile: req.body.nameOfFile,
        wordCount: req.body.wordCount,
        numberOfThreatWordsFound: req.body.numberOfThreatWordsFound,
        exactMatches: req.body.exactMatches,
        partialMatches: req.body.partialMatches
    });
    report.save(function (err) {
        if (err) return err;
        res.send(report.nameOfFile + " was added to the database.");
    })
}

exports.report_getall = function (req, res) {
    Report.find().
        exec(function (err, reports) {
            if (err) return (err);
            res.send(reports);
        });
}

exports.report_delete = function (req, res) {
    Report.findByIdAndRemove(req.parameters.id, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Removed '" + Report.nameOfFile + "' from the database.");
        };
    });
}