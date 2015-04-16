var im = require('imagemagick');
var path = require ('path');
var excel = require('./js/extractExcel.js')

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

