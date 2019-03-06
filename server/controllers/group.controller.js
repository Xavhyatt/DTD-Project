const Group = require('../models/group.model');

exports.group_create = function (req, res) {
	var keys = [];
	var specialchars = ["<",">","/","|",".",",","{","}","(",")","?","*","&","[","]","\"","\\","%","$","£","!",":","@","'","#","+","=",";"," "]; //ADD " "
	let check = req.body.group.split(" ");
	let checkwhole = req.body.group.split("");
	for(let i = 0; i < checkwhole.length; i++){
		for(let j = 0; j < specialchars.length; j++){
			if(checkwhole[i] == specialchars[j]){
				console.log("Illegal group Entry, check users.");
				res.send("Illegal group Entry, check group.");
				return ("Illegal group Entry");
			}
		}
	}
	if(req.body.group.length < 35 && req.body.group.length > 0){
		Group.find()
			.exec(function(err, groups) {
				if(err) {return (err);}
				for(groupFound in groups){
					if(groups[groupFound].group == req.body.group){
						res.send(req.body.group + " is already on the blacklist.");
						return ("group already on list");
					}
				}
			let group = new Group ({
				group: req.body.group
			})
			group.save(function (err) {
				if(err) return err;
				res.send(group.group + " was added to the blacklist.");
			})
		});
	}
};

exports.group_getall = function(req, res) {
	var groups = [];
	Group.find().
		exec(function(err, groupsFound){
			if(err) return (err);
			for(groupF in groupsFound){
				groups.push(groupsFound[groupF]);
			}
			res.send(groups);
		});
};

exports.group_delete = function(req, res) {
	Group.find().where("group", req.params.group).
		exec(function(err, group) {
			if(err) { return (err); }
			if(req.params.group === "Default"){
				res.send("Cannot Delete Default group");
				return "Cannot delete default group!";
			}
			if(group.length != 0){
				Group.findByIdAndRemove(group[0].id, function (err, group) {
					if(err) { return (err); }
					res.send("Deleted '" + req.params.group + "' from the groups list.");
				});
			} else {
				res.send("group doesn't exist.");
			}
		});
};
