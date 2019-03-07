let watch = require('node-watch');
let folder = './upload';
let folder2 = './convertedFiles';
const fs = require("fs");
if (!fs.existsSync(folder2)){
    console.log('covertedFiles Folder Created!')
    fs.mkdirSync(folder2);
}
if (!fs.existsSync(folder)){
    console.log('upload Folder Created!')
    fs.mkdirSync(folder);
}
watch(folder, { recursive: true }, function (evt, name) {
    console.log('%s changed.', name);
    let filename = name.substring(folder.length-2);
   
    let txtfile = folder2 + filename;
    const fs = require("fs");
    if (evt == 'update') {
  

        if (name.endsWith(".pdf")) {
            pdfToTxt(name, txtfile);
            fs.unlinkSync(name);
        }

        if (name.endsWith(".xlsx")) {
            xlsxToTxt(name, txtfile);
            fs.unlinkSync(name);
        }

        if (name.endsWith(".docx")) {
            createDocx(txtfile, name)
            fs.unlinkSync(name);
        }

    }
});

function pdfToTxt(name, txtfile) {
    const fs = require("fs");
    const pdf = require('pdf-parse');

    let dataBuffer = fs.readFileSync(name);

    pdf(dataBuffer).then(function (data) {
        createDocx(txtfile,data.text);
    });
}


function xlsxToTxt(name, txtfile) {
    let XLSX = require('xlsx')
    let workbook = XLSX.readFile(name);
    let sheet_name_list = workbook.SheetNames;
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let xlText = JSON.stringify(xlData);
    createDocx(txtfile, xlText)
    }


function createDocx(txtfile,text){
    let docx = require('docx');

    let doc = new docx.Document();

    let paragraph = new docx.Paragraph();
    paragraph.addRun(new docx.TextRun(text));
    doc.addParagraph(paragraph);


    let packer = new docx.Packer();
    packer.toBuffer(doc).then((buffer) => {
        if (txtfile.endsWith(".pdf")){
    fs.writeFileSync((txtfile.substring(0,txtfile.length-4)+".docx"), buffer)
    }
        else {
            fs.writeFileSync((txtfile.substring(0,txtfile.length-5)+".docx"), buffer)   
        }    
})
}

module.exports = {createDocx}
