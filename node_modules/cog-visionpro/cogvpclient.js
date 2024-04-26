//This is just function level lib, I know it is more feasible to use a class.
//Considering this is a small program, no need for that complicated.

const net = require('net');
//Result from visionpro
//You could use that for plc communication or embed boards.
var cognex_result = '';

//Cognex vision pro server connection
//Following is the visionpro default config
//If you would like to use that directly
//This function returns cognex visionpro return value

function VPClient(addr='127.0.0.1',port=5001){

    var isip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var isNumber = /^[0-9]+$/;
    if(!isip.test(addr)||!isNumber.test(port)){
        console.log("The address format is incorrect, the correct example is VPServer('127.0.0.1',5001)");
    }
    else{
        var client = new net.Socket();
        client.connect(port, addr, function () {
            console.log("Server connected.");
        });
        client.on("data", function (data) {
            console.log("Data received: " + data.toString());
            cognex_result = data.toString();
        });
    }
}

//Example, use default value defined in the function.
VPClient();


module.exports = { VPClient, cognex_result}