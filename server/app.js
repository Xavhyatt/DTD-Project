let express = require("express");
let formidable = require("formidable");
let fs = require("fs");
let watch = require('node-watch');
const fetch = require('node-fetch');
const pdf = require('pdf-parse');

let app = express();

app.get("/", function(req, res) {
  //res.sendFile(__dirname + "/upload.html");
});

app.post("/", function(req, res) {
  let form = new formidable.IncomingForm();

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
  form.on("end", function(name, file) {
    console.log("***All Files Downloaded***");
    res.sendFile(__dirname + "/Uploaded.html");
  });
});

let folder = './upload/';
let folder2 = './convertedFiles/';

if (!fs.existsSync(folder2)){
    console.log('covertedFiles Folder Created!')
    fs.mkdirSync(folder2);
}
watch(folder, { recursive: true }, function (evt, name) {
    console.log('%s changed.', name);
    let filename = name.substring(folder.length-2);
   
    let txtfile = folder2 + filename + ".txt";
    const fs = require("fs");
    if (evt == 'update') {
  

        if (name.endsWith(".pdf")) {
            pfdToTxt(name, txtfile);
            fs.unlinkSync(name);
        }

    }
});

function pfdToTxt(name, txtfile) {


    let dataBuffer = fs.readFileSync(name);

    pdf(dataBuffer).then(function (data) {

        fs.writeFile(txtfile, data.text, function (err) {
            if (err) throw err;
            console.log("PDF Converted !");
        })
    });
}

let buzzwordAPI = "http://51.137.151.100:3000/keywords/getall";



const request = async (data,name) => {
    fetch(buzzwordAPI)
    .then(response => response.text())
    .then(words => 
        
        scanText(data,words,name))
        .catch((error) => {
            console.log(error);
        });
        
}

var folder3 = './convertedFiles/';
watch(folder3, { recursive: true }, function (evt, name) {
    if (evt == 'update') {
    fs.readFile(name, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + name);
      
        let filename = name.substring(folder3.length-2,name.length-4);
      
        request(data, filename);
        
    })
}

})

function scanText(text, buzzwords, name){

    let taglessText = text.replace(/<(?:.|\n)*?>/gm, ' ');
    let wordArray = taglessText.split(" ");
    let wordcount = 0;
    wordArray.forEach(function(ele){
        if(ele.length > 0){
         wordcount ++; 
        }
    })
    let lowerText = taglessText.toLowerCase();
    var wordcnt = lowerText.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
        map[word] = (map[word]||0)+1;
        return map;
    }, Object.create(null));
  
    let definite =[];
    let maybe = [];
    let keys = Object.keys(wordcnt);
    buzzwords = JSON.parse(buzzwords);
    

    buzzwords.forEach(function(element){
    for(let i=0 ; i<keys.length ; i++){
        if(keys[i]===element){
            let flag = {"Word": element,
                        "Frequency" : wordcnt[element]}
          
             definite.push(flag);
        }
        if(keys[i].includes(element)){
            let flag = {"Word": keys[i],
            "Frequency" : wordcnt[keys[i]]}
            
            maybe.push(flag);
            
        }
    }    
})


  let json = {"nameOfFile" : name,
  "wordCount" : wordcount, "numberOfThreatWordsFound": definite.length, "exactMatches": definite,
  "partialMatches":maybe};
  console.log(json);
  let dir = __dirname +'/reports';
  if (!fs.existsSync(dir)){
      console.log('reports Folder Created!')
      fs.mkdirSync(dir);
  }
  let fileloc = './reports/' + name.substring(0,name.length-4) + ".json";

 
   fs.writeFile(fileloc, JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log("json created");
})
}



module.exports = app;
