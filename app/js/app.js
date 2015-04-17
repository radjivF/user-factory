var im = require('imagemagick');
var path = require ('path');
var excel = require('./js/extractExcel.js');
var createJson =require('./js/createJson.js');


window.ondragover = function(e){
	e.preventDefault(); return false;
}

window.ondrop = function(e){
	e.preventDefault(); return false;	
}

var el = document.querySelector('#drop');
el.ondragover = function(){
	this.className ="hover";
	this.innerHTML ="Glisse ton fichier";
	return false;
}

el.ondragleave = function(){
	this.className = "";
	this.innerHTML = "Dépose ton fichier excel";
	return false;
}

el.ondrop = function(e){
	e.preventDefault();
	for(var i=0; i < e.dataTransfer.files.length; ++i){
		var file= e.dataTransfer.files[i].path;
		console.log( );
		if(path.extname(file)== ".xlsx"){

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
}


function processFormData() 
{

  var name_element = document.getElementById('txt_name');
  var prenom_element = document.getElementById('txt_prenom');
  var email_element = document.getElementById('txt_email'); 
  var password_element = document.getElementById('txt_password');
  var role_element = document.getElementById('txt_role');
  var provider_element = document.getElementById('txt_provider');


  var name = name_element.value;
  var prenom = prenom_element.value;
  var email = email_element.value;
  var password = password_element.value;
  var role = role_element.value;
  var provider = provider_element.value;

  var error_message = 'The following fields had errors in them: \n\n';
  var data = 'You entered the following information: \n\n';

  var error_flag = false;

  if(name == '' && prenom== '' && email== '' && password== '' && provider== '' ) {
	  error_flag = true;
  } else {
	  data += 'Name: ' + name + '\n'  +'prenom: ' + prenom + '\n' +'password: ' + password + '\n' +'role: ' + role + '\n' +'email: ' + email + '\n';
  }

  if(error_flag) {
	  alert('nom, prenom, email, password, provider doivent etre renseigner');
  } else {
	createJson.createOneJson(name, prenom, email, provider, password, role);

  }

}

