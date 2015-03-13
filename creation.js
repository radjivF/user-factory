var fs = require('fs');
var jf = require('jsonfile');
var readline = require('readline');
var changeCase = require('change-case');
var removeDiacritics = require('diacritics').remove;
var jf = require('jsonfile');
var util = require('util');
var str2json = require('string-to-json');
var config = require('./config.json');
var file = require('./output.json');

var list = file;
var groupFromConsole= config.group;
var passwordFromConsole = config.password;
var roleFromConsole = config.role;


for(var i = 0; i < list.length;i++){
    var nomFromConsole = list[i].nom;
    var prenomFromConsole = list[i].prenom;
    var mailAdressFromConsole = list[i].email;

    var providerDiacritics = removeDiacritics(groupFromConsole);
    var nomDiacritics = removeDiacritics(nomFromConsole);
    var prenomDiacritics = removeDiacritics(prenomFromConsole);
    var mailDiacritics = removeDiacritics(mailAdressFromConsole);
    var passwordDiacritics = removeDiacritics(passwordFromConsole);

    var providerLowCase = changeCase.lowerCase(providerDiacritics);
    var nomLowCase = changeCase.lowerCase(nomDiacritics);
    var prenomLowCase = changeCase.lowerCase(prenomDiacritics);
    var mailAdressLowCase = changeCase.lowerCase(mailDiacritics);


    var provider = changeCase.upperCaseFirst(providerLowCase);
    var nom = changeCase.upperCaseFirst(nomLowCase);
    var prenom = changeCase.upperCaseFirst(prenomLowCase);
    var mailAdress = changeCase.lowerCase(mailAdressLowCase);
    var password = passwordFromConsole;
    var role = roleFromConsole;


    //creation of the json Object
    jsonObject = {
        "group" : provider,
        "displayName" : prenom+" "+nom,
        "login" : mailAdress,
        "password" : password,
        "passwordHashed": "true",
        "addresses" : "Address",
        "photos" : [],   
        "emails" :
        {
                "value" : mailAdress,
        },
        "role" : role,

        "name" : {
            "familyName" : nom,
            "givenName" : prenom
        }
    };

    //creation of the file
    fileName= "user/"+providerLowCase+"-"+prenomLowCase+"-"+nomLowCase+".json";
    var jsonString =  JSON.stringify(jsonObject);
    var file = fileName;
    jf.writeFileSync(file, jsonObject);
    console.log("user " +list[i].nom+ " created")
}
