let watch = require('node-watch');
const fs = require("fs");
const fetch = require('node-fetch');
let ConvertToTxt = require("./ConvertToTxt.js");
let buzzwordAPI = "http://51.137.151.100:9123/keywords/getall";

let PostURL = "http://51.137.151.100:9123/report/create";

let totalFrequency = require("./threatLevel/TotalFrequency");
let assignThreatLevel = require("./threatLevel/AssignThreatLevel");
let calculatePercentage = require("./threatLevel/CalculatePercentage")
let boundOne = 2;
let boundTwo = 4;

const request = async (data,name) => {
    fetch(buzzwordAPI)
    .then(response => response.text())
    .then(words => 
        
        scanText(data,words,name))
        .catch((error) => {
            console.log(error);
        });
        
}

let folder = './convertedFiles/';
watch(folder, { recursive: true }, function (evt, name) {
    if (evt == 'update') {
    fs.readFile(name, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + name);
        let filename = name.substring(folder.length-2,name.length-4);
      
        request(data, filename);
        
    })
}

})

function scanText(text, buzzwords, name){
    let taglessText = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
    let wordArray = taglessText.split(" ");
    let wordcount = 0;
    wordArray.forEach(function(ele){
        if(ele.length > 0){
         wordcount ++; 
        }
    })
    let lowerText = taglessText.toLowerCase();
    console.log(lowerText)
    let wordcnt = lowerText.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
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


    let exactMatchFrequency = totalFrequency(definite);
    let json = {
        "nameOfFile": name,
        "threatLevel": assignThreatLevel(boundOne, boundTwo, calculatePercentage(exactMatchFrequency, wordcount)),
        "wordCount": wordcount, "numberOfThreatWordsFound": exactMatchFrequency, 
        "exactMatches": definite, "partialMatches": maybe
    };
	
  let reportRequest = new XMLHttpRequest();
		
	reportRequest.open('POST', PostURL, true);
		
	reportRequest.setRequestHeader('Content-Type', 'application/json');   
		
	reportRequest.responseType = 'json';
		
	reportRequest.send(JSON.stringify(json));

	reportRequest.onload = function(){
		console.log("Report Created");
	}
    
  let dir = __dirname +'/reports';
  if (!fs.existsSync(dir)){
      console.log('reports Folder Created!')
      fs.mkdirSync(dir);
  }
  let fileloc = './reports/' + name.substring(0,name.length-1) + ".json";
  let resultsLoc = '../client/src/results/results.json';

   fs.writeFile(fileloc, JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log('json created');
    let deleteconverted = './convertedFiles/' + name + 'docx'; 
    fs.unlinkSync(deleteconverted);   
})
	
ConvertToTxt.createDocx(fileloc , JSON.stringify(json));
}
