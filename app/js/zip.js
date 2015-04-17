var path = require('path')
var fs = require('fs-extra');
var easyzip = require('easy-zip');
var zip = new easyzip.EasyZip(); 

exports.createZip = function(pathFolder){

	var folderName = path.basename(pathFolder);
	var zipUser = new easyzip.EasyZip();
	var zipPath = path.dirname(pathFolder);

	zipUser.zipFolder(pathFolder,function(){
		
	    zipUser.writeToFile(zipPath+'/'+folderName+'.zip');
	    fs.removeSync(zipPath+'/'+folderName);

	});
	console.log(zipPath+'/'+folderName+'.zip');
}