var path = require('path')
var fsExtra = require('fs-extra');
var easyzip = require('easy-zip');
var zip = new easyzip.EasyZip();
var fs = require('fs');

exports.createZip = function(pathFolder){

	var folderName = path.basename(pathFolder);
	var zipUser = new easyzip.EasyZip();
	var zipPath = path.dirname(pathFolder);
	var zipName = zipPath+'/'+folderName+'.zip';
	
	
	zipUser.zipFolder(pathFolder,function(err, result){

	    zipUser.writeToFile(zipName);
	    fsExtra.removeSync(zipPath+'/'+folderName);
	});

};