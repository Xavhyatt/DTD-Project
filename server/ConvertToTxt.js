let watch = require('node-watch');
let pfdToTxt = require('./convertpdf');
let folder = './upload/';
let folder2 = './convertedFiles/';
const fs = require("fs");
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




