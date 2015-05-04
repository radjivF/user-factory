var xlsxj = require('xlsx-to-json');
var user =require('../js/createJson.js');

exports.extractExcel = function(path,languageCheckbox, callback){
  xlsxj({
    input: path, 
    output: "output.json"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      user.createJson(result, path , languageCheckbox);

    }
  }); 	
}