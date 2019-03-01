let watch = require('node-watch');
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

function pfdToTxt(name, txtfile) {
    const fs = require("fs");
    const pdf = require('pdf-parse');

    let dataBuffer = fs.readFileSync(name);

    pdf(dataBuffer).then(function (data) {

        fs.writeFile(txtfile, data.text, function (err) {
            if (err) throw err;
            console.log("PDF Converted !");
        })
    });
}



