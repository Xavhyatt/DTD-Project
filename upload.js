var express = require('express');
var formidable = require('formidable');
var fs = require('fs');

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/upload.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();
    
    form.parse(req);

    let dir = __dirname +'/upload';
    if (!fs.existsSync(dir)){
        console.log('Folder Created!')
        fs.mkdirSync(dir);
    }
    form.on('fileBegin', function (name, file){
        file.path = __dirname +'/upload/'+ file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    console.log(__dirname);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Files Uploaded</h1>');
    return res.end();
});

app.listen(3000);