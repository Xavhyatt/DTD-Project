var watch = require('node-watch');
const fs = require("fs");
const fetch = require('node-fetch');
let buzzwordAPI = "http://51.137.151.100:9123/keywords/getall";

console.log('here');

const request = async (data,name) => {
    fetch(buzzwordAPI)
    .then(response => response.text())
    .then(words => 
        
        scanText(data,words,name))
        .catch((error) => {
            console.log(error);
        });
        
}

var folder = './convertedFiles/';
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
    for(i=0 ; i<keys.length ; i++){
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

  let fileloc = '../client/src/results/' + name.substring(0,name.length-4) + ".json";

 
   fs.writeFile(fileloc, JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log("json created");
})
}

