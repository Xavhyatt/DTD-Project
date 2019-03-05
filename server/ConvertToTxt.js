let watch = require('node-watch');
let folder = './upload';
let folder2 = './convertedFiles';
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
            pdfToTxt(name, txtfile);
            fs.unlinkSync(name);
        }

        if (name.endsWith(".xlsx")) {
            xlsxToTxt(name, txtfile);
            fs.unlinkSync(name);
        }

        if (name.endsWith(".docx")) {
            docxToText(name, txtfile);
            fs.unlinkSync(name);
        }

    }
});

function docxToText(name,txtfile) {
    const fs = require("fs");
    var mammoth = require("mammoth");

    mammoth.convertToHtml({ path: name })
        .then(function (result) {
            let html = result.value;
            let messages = result.messages;
            fs.writeFile(txtfile, html, function (err) {
                if (err) throw err;
                console.log("Docx Converted");
            })
        })
        .done();
}

function pdfToTxt(name, txtfile) {
    const fs = require("fs");
    const pdf = require('pdf-parse');

    let dataBuffer = fs.readFileSync(name);

    pdf(dataBuffer).then(function (data) {
        createDocx(txtfile,data.text);
    });
}


function xlsxToTxt(name, txtfile) {
    XLSX = require('xlsx');
    let workbook = XLSX.readFile(name);
    let sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) {
    let worksheet = workbook.Sheets[y];
    for (z in worksheet) {
    if(z[0] === '!') continue;

  }

});
XLSX.writeFile(workbook, txtfile);
}


function createDocx(txtfile,text){
    let docx = require('docx');

    let doc = new docx.Document();

    let paragraph = new docx.Paragraph();
    paragraph.addRun(new docx.TextRun(text));
    doc.addParagraph(paragraph);


    let packer = new docx.Packer();
    packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync((txtfile.substring(0,txtfile.length-4)+".docx"), buffer)
    })
};
