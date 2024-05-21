//Custom functions
function showFileName(filePath){
	pos=filePath.lastIndexOf("\\");
	fileName=filePath.substr(pos+1);
	document.getElementById("lblFileName").innerHTML=fileName;
}
function showFileName2(filePath,lblId){
	pos=filePath.lastIndexOf("\\");
	fileName=filePath.substr(pos+1);
	document.getElementById(lblId).innerHTML=fileName;
}