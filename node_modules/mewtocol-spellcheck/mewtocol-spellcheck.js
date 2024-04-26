//This program is for serial port command conversion
const mewtocol = require('mewtocol-serial');
const serial = require('serialport');


//Validate user input right or wrong.
//Many IoT devices only accepts the specific command with \r
//Refer to user manual before make the judgements.
//Here is the situation with \r that tells the device command finished.
function ValidateUinput(a){
		var result = false;
		var caseOK = a.indexOf("\r");
		if (caseOK != -1){
			console.log("Input valid.");
			result = true;
		}else{
			console.log("Input invalid!");
		}
		return result;
}

//Many people overlook the \r
//This function will add "\r" automatically
function CorrectInput(b){
	var result = b;
	var caseGood = b.indexOf("\r");
	if (caseGood === -1){
		console.log("The input is invalid, correcting the inputs.");
		b += "\r";
		console.log("The input has fixed.");
	}
	return result;
}

//In many case, some of the IoT meter uses hex to transfer readings.
//Such as ampare meter, voltage meter, scaller etc.
//They use Hex value communication, this function will check if the input value that send to meter is hex value.
//Validate input is hex value
//Inportant notices, the value that could not starts with 0x...
function ValidHexFormatA(c){
	var result = false;
	var pattern = "^[0-9a-fA-F]+$";
	var hexFormatA = c.search(pattern);
	if (hexFormatA == 0)
	{console.log("Format correct.");result = true;}
	if (hexFormatA == -1)
	{console.log("Format incorrect.");}
	return result;
}

module.exports = {
	ValidateUinput,
	CorrectInput,
	ValidHexFormatA
}

//Example here. If you use directly instad import lib.
//ValidHexFormatA("0x11");
//ValidHexFormatA("FF")

