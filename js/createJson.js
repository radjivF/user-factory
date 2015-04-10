var fs = require('fs');
var jf = require('jsonfile');
var readline = require('readline');
var changeCase = require('change-case');
var removeDiacritics = require('diacritics').remove;
var jf = require('jsonfile');
var util = require('util');
var template = require('../template/template-basic.js');

exports.createJson = function(data){
	for (var i = 0; i < data.length; i++) {

		var provider = removeDiacritics(data[i].provider);
		var nom =  changeCase.lowerCase(data[i].nom);
		var prenom =  changeCase.lowerCase(data[i].prenom);
		var mail =  changeCase.lowerCase(data[i].mail);
		var password =  password;
		console.log(JSON.stringify(template.user.name));

		template.user.name.familyName = nom;
		template.user.name.givenName = prenom;
		//template.user.emails[1].value = mail;
		template.user.provider = provider;
        template.user.providerUserId = mail;
        template.user.displayName = prenom+" "+nom;
        template.user.login = mail;
        template.user.password = password;

		var fileName= provider+"-"+prenom+"-"+nom+".json";
	    var jsonString =  JSON.stringify(template.user);
	    var file = fileName;
	    jf.writeFileSync(file, template.user);
	    console.log("user " +data[i].nom+ " created");
	};
}