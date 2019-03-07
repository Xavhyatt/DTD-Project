const express = require('express');
const bodyParser = require('body-parser');
const keyword = require('./routes/keyword.route');
const group = require('./routes/group.route');
const report = require('./routes/report.route');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

let app = express();
app.use(cors());

http.createServer(app).listen(9123);

var url = 'mongodb://yellowstone:EWssYRcsN8Nz6K9cMTNrBu0xMmLiq1MuZOvKfmf696ArodtGudbi3UFa6vSPVVgjDxAZCA1upmx6ndIQ9lP31A%3D%3D@yellowstone.documents.azure.com:10255/?ssl=true';
const mongoDB = process.env.MONGODB_URI || url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/keywords', keyword);
app.use('/groups', group);
app.use('/report', report);

app.listen = function(){
    console.log('Server is up and running on port number 9123');
    var server = http.createServer(this);
};
