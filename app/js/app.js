/* global display */
var path = require ('path');
var excel = require('./js/extractExcel.js');
var createJson =require('./js/createJson.js');

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
	var languageCheckbox = document.getElementById('language_checkbox').checked;
//	console.log(languageCheckbox);
	e.preventDefault();
	for(var i=0; i < e.dataTransfer.files.length; ++i){
		var file= e.dataTransfer.files[i].path;

		if(path.extname(file)== ".xlsx"){
//				console.log('app.js apres drop'+languageCheckbox);
			excel.extractExcel(file , languageCheckbox);
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
	checkbox language event
*/
function handleClick(cb) {
	if (cb.checked == true) {
		document.getElementById('txt_language').disabled = false;
	}else {
		document.getElementById('txt_language').disabled = true;
	}
};

/*
	form event to create one user
*/
function processFormData() 
{

	var name_element = document.getElementById('txt_name');
	var firstname_element = document.getElementById('txt_firstname');
	var email_element = document.getElementById('txt_email'); 
	var password_element = document.getElementById('txt_password');
	var role_element = document.getElementById('txt_role');
	var provider_element = document.getElementById('txt_provider');
	var language_element = document.getElementById('txt_language');
	var languageCheckbox = document.getElementById('language_checkbox').checked;
	var name = name_element.value;
	var firstname = firstname_element.value;
	var email = email_element.value;
	var password = password_element.value;
	var role = role_element.value;
	var provider = provider_element.value;
	var language = language_element.value;

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
	createJson.createOneJson(name, firstname, email, provider, password, role, language, languageCheckbox);
  }

}

