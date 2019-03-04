const Keyword = require('../models/keyword.model');

exports.keyword_create = function (req, res) {
	var keys = [];
	var specialchars = ["<",">","/","|",".",",","{","}","(",")","?","*","&","[","]","\"","\\","%","$","£","!",":","@","'","#","+","=",";"];
	let check = req.body.keyword.split(" ");
	let checkwhole = req.body.keyword.split("");
	for(let i = 0; i < checkwhole.length; i++){
		for(let j = 0; j < specialchars.length; j++){
			if(checkwhole[i] == specialchars[j]){
				console.log("Illegal keyword Entry, check users.");
				res.send("Illegal keyword Entry, check keyword keyword.");
				return ("Illegal keyword Entry");
			}
		}
	}
	if(check.length == 1 && req.body.keyword.length < 35 && req.body.keyword.length > 0){
		Keyword.find()
			.exec(function(err, keywords) {
				if(err) {return (err);}
				for(word in keywords){
					if(keywords[word].keyword == req.body.keyword){
						res.send(req.body.keyword + " is already on the blacklist.");
						return ("keyword already on list");
					}
				}
			let keyword = new Keyword ({
				keyword: req.body.keyword
			})
			keyword.save(function (err) {
				if(err) return err;
				res.send(keyword.keyword + " was added to the blacklist.");
			})
		});
	}
};

exports.keyword_getall = function(req, res) {
	var keys = [];
	Keyword.find().
		exec(function(err, keywords){
			if(err) return (err);
			for(word in keywords){
				keys.push(keywords[word].keyword);
			}
			res.send(keys);
		});
};

exports.keyword_delete = function(req, res) {
	Keyword.find().where("keyword", req.params.keyword).
		exec(function(err, keyword) {
			if(err) { return (err); }
			console.log(keyword.length);
			if(keyword.length != 0){
				Keyword.findByIdAndRemove(keyword[0].id, function (err, keyword) {
					if(err) { return (err); }
					res.send("Deleted '" + req.params.keyword + "' from the blacklist.");
				});
			} else {
				res.send("keyword doesn't exist.");
			}
		});
};
