/* global display */
var path = require ('path');
var excel = require('./js/extractExcel.js');
var createJson =require('./js/createJson.js');
var _ = require('lodash');

var nw = require('nw.gui');

var win = nw.Window.get();
var nativeMenuBar = new nw.Menu({ type: "menubar" });

if (nativeMenuBar.createMacBuiltin) {
  nativeMenuBar.createMacBuiltin("User-factory");
}

win.menu = nativeMenuBar;


window.ondragover = function(e){
	e.preventDefault(); return false;
};

window.ondrop = function(e){
	e.preventDefault(); return false;	
};

var el = document.querySelector('#drop');
el.ondragover = function(){
	this.className ="hover";
	this.innerHTML ="Glisse ton fichier";
	return false;
};

el.ondragleave = function(){
	this.className = "";
	this.innerHTML = "Dépose ton fichier excel";
	return false;
};

/*
	droping excel event
*/
el.ondrop = function(e){
	e.preventDefault();
	for(var i=0; i < e.dataTransfer.files.length; ++i){
		var file= e.dataTransfer.files[i].path;

		if(path.extname(file)== ".xlsx"){
//				console.log('app.js apres drop'+languageCheckbox);
			excel.extractExcel(file);
			el.className =  "";
			el.innerHTML ="travail terminé";
			var audio  = new Audio('sound/done.ogg');
			audio.volume= 0.2;
			audio.play();
		}
		else{
			el.style.color = 'red';
			el.innerHTML ="Fichier excel requis";			
		}
		
	}
};


/*
	form event to create one user
*/
function processFormData() 
{



  var name = document.getElementById('txt_name').value;
  var firstname = document.getElementById('txt_firstname').value;
  var email =  document.getElementById('txt_email').value;
  var password = document.getElementById('txt_password').value;
  var role = document.getElementById('txt_role').value;
  var provider = document.getElementById('txt_provider').value;
  var language = document.getElementById('txt_language').value;
  var login = document.getElementById('txt_login').value;
 	

  var data = 'You entered the following information: \n\n';
  var error_flag = false;

  if(name == '' || firstname== '' || email== '' || password== '' || provider== '' ) {
	  error_flag = true;
  } else {
	  data += 'Name: ' + name + '\n'  +'firstname: ' + firstname + '\n' +'password: ' + password + '\n' +'role: ' + role + '\n' +'email: ' + email + '\n';
  }

  if(error_flag) {
	  alert('nom, firstname, email, password, provider, language doivent etre renseigner');
  } else {
	
		createJson.createOneJson(name, firstname, email, provider, password, role, language, login);
		var audio  = new Audio('sound/done.ogg');
		audio.volume= 0.2;
		audio.play();
  }
}

