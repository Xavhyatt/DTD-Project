const Keyword = require('../models/keyword.model');

exports.keyword_create = function (req, res) {
	var keys = [];
	console.log(req.body.keyword);
	
	//Define Disallowed Characters
	var specialchars = ["<",">","/","|",".",",","{","}","(",")","?","*","&","[","]","\"","\\","%","$","£","!",":","@","'","#","+","=",";"," "];
	let checkwhole = req.body.keyword.split("");
	//Check word for Disallowed Characters
	for(let i = 0; i < checkwhole.length; i++){
		for(let j = 0; j < specialchars.length; j++){
			if(checkwhole[i] == specialchars[j]){
				console.log("Illegal keyword Entry, check users.");
				res.send("Illegal keyword Entry, check keyword keyword.");
				return ("Illegal keyword Entry");
			}
		}
	}
	
	if(req.body.keyword.length < 35 && req.body.keyword.length > 0 && req.body.score < 6 && req.body.score > 0){
		//Attempt to find already existing word
		Keyword.find().where("group", req.body.group).
			exec(function(err, keywords) {
				if(err) {return (err);}
				for(word in keywords){
					if(keywords[word].keyword == req.body.keyword){
						res.send(req.body.keyword + " is already on the blacklist.");
						return ("keyword already on list");
					}
				}
			//Create new Keyword object.
			let keyword = new Keyword ({
				keyword: req.body.keyword,
				group: req.body.group,
				score: req.body.score
			})
			//Save new Keyword object
			keyword.save(function (err) {
				if(err) return err;
				res.send(keyword.keyword + " was added to the blacklist.");
			})
		});
	}
};

exports.keyword_deleteByGroup = function(req, res) {
	Keyword.find().where("group", req.params.group).
		exec(function (err, keyword) {
			if(err) {return (err); }
			if(keyword.length != 0){
				for(let i = 0; i < keyword.length; i++){
					console.log(keyword[i]);
					Keyword.findByIdAndRemove(keyword[i].id, function(err, keyword) {
						if(err) { return (err); };
					});
				}
			} else {
				res.send("Doesn't exist");
			}
	});
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
