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

module.exports = pfdToTxt;