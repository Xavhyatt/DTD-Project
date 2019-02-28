let express = require("express");
let formidable = require("formidable");
let fs = require("fs");

let app = express();

app.get("/", function(req, res) {
  //res.sendFile(__dirname + "/upload.html");
});

app.post("/", function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  let dir = __dirname + "/upload";
  if (!fs.existsSync(dir)) {
    console.log("Folder Created!");
    fs.mkdirSync(dir);
  }

  form.on("fileBegin", function(name, file) {
    file.path = __dirname + "/upload/" + file.name;
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });
  form.on("end", function() {
    console.log("***All Files Downloaded***");
    res.sendFile(__dirname + "/Uploaded.html"); // console.log(__dirname);
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<h1>Files Uploaded</h1>");
    // res.write('<a href="/">Back</a>');
    // return res.end();
  });
});

//app.listen(3000);
module.exports = app;
