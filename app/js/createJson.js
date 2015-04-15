var fs = require('fs');
var jf = require('jsonfile');
var readline = require('readline');
var changeCase = require('change-case');
var removeDiacritics = require('diacritics').remove;
var jf = require('jsonfile');
var util = require('util');
var path = require('path');
var template = require('../template/template-basic.js');
var zip =require('../js/zip.js');

exports.createJson = function(data, pathFile){
	
	//creation of the folder 

	var FolderPath = path.dirname(pathFile);
	var zipName = path.basename(pathFile, '.xlsx');
	var zipFolderPath=FolderPath+'/'+zipName;
	fs.mkdirSync(zipFolderPath);

	for (var i = 0; i < data.length; i++) {

		var provider = removeDiacritics(data[i].provider);
		var nom =  changeCase.lowerCase(data[i].nom);
		var prenom =  changeCase.lowerCase(data[i].prenom);
		var mail =  changeCase.lowerCase(data[i].email);
		var password =  data[i].password;

		template.user.name.familyName = nom;
		template.user.name.givenName = prenom;
		template.user.emails[0].value = mail;
		template.user.provider = provider;
        template.user.providerUserId = mail;
        template.user.displayName = prenom+" "+nom;
        template.user.login = mail;
        template.user.password = password;

		var fileName= zipFolderPath+'/' +provider+"-"+prenom+"-"+nom+".json";
	    var jsonString =  JSON.stringify(template.user);
	    var file = fileName;
	    jf.writeFileSync(file, template.user);
	    zip.createZip(zipFolderPath);
	};

}