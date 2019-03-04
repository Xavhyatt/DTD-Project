let express = require("express");
let formidable = require("formidable");
let fs = require("fs");

let app = express();

let dir = __dirname + "/upload";

if (!fs.existsSync(dir)) {
  console.log("Folder Created!"); 
  fs.mkdirSync(dir);
}

app.get("/", function(req, res) {
});

app.post("/", function(req, res) {
  let form = new formidable.IncomingForm();

  form.parse(req);

  form.on("fileBegin", function(name, file) {
    file.path = __dirname + "/upload/" + file.name;
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });
  form.on("end", function() {
    console.log("***All Files Downloaded***");
    res.sendFile(__dirname + "/Uploaded.html");

  });
});

module.exports = app;
