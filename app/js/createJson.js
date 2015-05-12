var fs = require('fs');
var jf = require('jsonfile');
var readline = require('readline');
var changeCase = require('change-case');
var removeDiacritics = require('diacritics').remove;
var util = require('util');
var path = require('path');
var template = require('../template/template-langue.js');
var zip =require('../js/zip.js');
var mkdirp = require('mkdirp');
var path = require('path-extra');
var easyzip = require('easy-zip');
var _ = require('lodash');


exports.createJson = function(data, pathFile){

	//creation of the folder 
	var FolderPath = path.dirname(pathFile);
	var zipName = path.basename(pathFile, '.xlsx');
	var zipFolderPath=FolderPath+'/'+zipName;
	mkdirp.sync(zipFolderPath);
	var usercreated = 0;
	
	// check the column
	if (_.isEmpty(data[0].lastName) || _.isEmpty(data[0].provider) || _.isEmpty(data[0].firstName) || _.isEmpty(data[0].email) || _.isEmpty(data[0].password)){
		window.alert("Probleme verifier le excel");
	}
	
	
	for (var i = 0; i < data.length; i++) {
		
		
		var provider = removeDiacritics(data[i].provider);
		var name =  data[i].lastName;
		var firstname =  data[i].firstName;

		var mail =  changeCase.lowerCase(data[i].email.replace(/\s/g, ''));
		
		if (data[i].lastName.length!=0) {
			if (_.isEmpty(data[i].lastName) || _.isEmpty(data[i].provider) || _.isEmpty(data[i].firstName) || _.isEmpty(data[i].email) || _.isEmpty(data[i].password)){
				window.alert("Probleme ligne " + i);
				return;
			}
			template.user.name.familyName = name;
			template.user.name.givenName = firstname;
			template.user.emails[0].value = mail;
			template.user.provider = provider;
	        template.user.providerUserId = mail;
	        template.user.displayName = firstname+" "+name;
	        template.user.password =  data[i].password;
			template.user.organizations[0].name = provider;
			
			if(_.has(data[i], 'language')){
				//console.log(data[i].language)
				template.user.language = data[i].language;
				
			}
			else{
				delete template.user.language;
			}

			if (_.has(data[i], 'role')){	
				template.user.role = data[i].role.split(', ');
			} 
			else{
				//Here to clean block the cache problem
				template.user.role = [];
			}
			
			if (_.has(data[i], 'login')){	
				template.user.login = changeCase.lowerCase(data[i].login);
			}
			else{
				template.user.login = mail;
			}
		}

		if(name.length!=0){
			var fileName= zipFolderPath+'/' +provider+"-"+firstname+"-"+name+".json";
			var jsonString =  JSON.stringify(template.user);
	    	jf.writeFileSync(fileName, template.user);
			usercreated ++;
		}
	}
	zip.createZip(zipFolderPath);
	window.alert("Succés "+usercreated +" créés");
};

exports.createOneJson = function(name, firstname, email, provider, password, role, language, login){
	
	if (_.isEmpty(role)){
		template.user.role = [];
	}
	else{
		//Here to clean block the cache problem
		template.user.role= role.split(', ');	
	};
	
	template.user.name.familyName = name;
	template.user.name.givenName = firstname;
	template.user.emails[0].value = changeCase.lowerCase(email.replace(/\s/g, ''));
	template.user.provider = removeDiacritics(provider);
    template.user.providerUserId = changeCase.lowerCase(email.replace(/\s/g, ''));
    template.user.displayName = name+" "+firstname;

	if(_.isEmpty(login)){
		template.user.login = email;
	}
	else{
		template.user.login = login;
	}
	if (_.isEmpty(language)) {
		delete template.user.language;
	}
	else{
		template.user.language = language;
	}
    template.user.password = password;

	template.user.organizations[0].name = removeDiacritics(provider);

	var fileName=  path.homedir()+'/Desktop'+'/' +provider+"-"+firstname+"-"+name+".json";
    jf.writeFileSync(fileName, template.user);
	window.alert("Succés, le json se trouve sur votre bureau");
};