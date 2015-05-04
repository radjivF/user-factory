var fs = require('fs');
var jf = require('jsonfile');
var readline = require('readline');
var changeCase = require('change-case');
var removeDiacritics = require('diacritics').remove;
var jf = require('jsonfile');
var util = require('util');
var path = require('path');
var templateBasic = require('../template/template-basic.js');
var templateLangue = require('../template/template-langue.js');
var zip =require('../js/zip.js');
var mkdirp = require('mkdirp');
var path = require('path-extra');
var easyzip = require('easy-zip');





exports.createJson = function(data, pathFile, languageCheckbox){
	console.log(typeof languageCheckbox + languageCheckbox);
	var template = templateBasic;
	if (languageCheckbox == true) {
		template = templateLangue;
	} else {
		template = templateBasic;
	}
	console.log(JSON.stringify(template));

	
	var FolderPath = path.dirname(pathFile);
	var zipName = path.basename(pathFile, '.xlsx');
	var zipFolderPath=FolderPath+'/'+zipName;
	mkdirp.sync(zipFolderPath);

	for (var i = 0; i < data.length; i++) {

		var provider = removeDiacritics(data[i].provider);
		var name =  changeCase.lowerCase(data[i].lastname);
		var firstname =  changeCase.lowerCase(data[i].firstname);
		var mail =  changeCase.lowerCase(data[i].email);
		var password =  data[i].password;
		var language = data[i].language;
		template.user.name.familyName = name;
		template.user.name.givenName = firstname;
		template.user.emails[0].value = mail;
		template.user.provider = provider;
        template.user.providerUserId = mail;
        template.user.displayName = firstname+" "+name;
        template.user.login = mail;
        template.user.password = password;
		
		if(languageCheckbox == true){
			template.user.language = language;
		}


		var fileName= zipFolderPath+'/' +provider+"-"+firstname+"-"+name+".json";
	    var jsonString =  JSON.stringify(template.user);
	    var file = fileName;
	    jf.writeFileSync(file, template.user);
	    zip.createZip(zipFolderPath);
	};
}

exports.createOneJson = function(name, firstname, email, provider, password, role, language, languageCheckbox){
	console.log(languageCheckbox)
	var template = templateBasic;
	if (languageCheckbox == true) {
		template = templateLangue;
	} else {
		template = templateBasic;
	}
	//creation of the folder 
	
	zipFolderPath = path.homedir();

	provider = removeDiacritics(provider);
	name =  changeCase.lowerCase(name);
	firstname =  changeCase.lowerCase(firstname);
	email =  changeCase.lowerCase(email);
	password =  password;
	//var role = role.split(',');
	role = role.split(', ');
	console.log(role);

	template.user.name.familyName = name;
	template.user.name.givenName = firstname;
	template.user.emails[0].value = email;
	template.user.provider = provider;
    template.user.providerUserId = email;
    template.user.displayName = firstname+" "+name;
    template.user.login = email;
    template.user.password = password;
    template.user.role= role;
	if(languageCheckbox == true){
		template.user.language = language;
	}

	var fileName= zipFolderPath+'/Desktop'+'/' +provider+"-"+firstname+"-"+name+".json";
    var jsonString =  JSON.stringify(template.user);
    var file = fileName;
    jf.writeFileSync(file, template.user);

}