const conversion = require('../convertpdf.js');
let fs = require('fs');
var expect = require('chai').expect;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

describe('pdfToTxt()',function (){
    it('should convert a PDF to Txt', async () => {
        let name = './test/QAC_What_is_an_API.pdf';
        let txtfile = './test/QAC_What_is_an_API.pdf.txt'
        let newFile = fs.existsSync(txtfile);
        
        conversion(name, txtfile);
       await sleep(1900).then(() => {

        expect(newFile).to.be.true });
    
      

        })
    });


       
        

        

       
       // fs.unlinkSync(txtfile);
