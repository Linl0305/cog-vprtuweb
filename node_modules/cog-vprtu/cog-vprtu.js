//Check there is a lib that communiction with cognex visionpro, here is a cheap solution.
//Using a modbus rtu is a good idea.

const vp = require('cog-visionpro');
const { SerialPort } = require('serialport');
//Default serialport configuration
const defaultport = "COM1";
const defaultBaudRate = 9600;
const port = new SerialPort({ path: defaultport, baudRate:defaultBaudRate, autoOpen: false });
port.open(function (err) {
  if (err) {
    console.log('Port open fail: ' + err.message + "\n");
    return;
    }
  console.log(defaultport + ' open sucesses.' + "\r");
  });
port.on('error', err => {
  console.log('There is an error: ' + err.message + "\n");
});
//ReadMessage
port.on('data', data => {
  console.log('Data received: ' + data + "\n");
});


//Modbus crc calculations
function modbus_crc(input){
    let crc  = 0xFFFF;
    for (let i=0; i<input.length;i++){
        crc ^= input[i]&0xFFFF;
        for(let j=0;j<8;j++){
            if(crc&0x0001){
                crc>>=1;
                crc^=0xA001;
            }else{
                crc>>=1;
            }
        }
    }

    //Return as a string directory
    crc = crc.toString(16);
    //Section to an string
    let crcArray = new Array(2);
    crcArray[0]=crc.substring(2,4);
    crcArray[1]=crc.substring(0,2);


    //If you would like to return as a array, change the return value to crcArray
    return crc;
}

//Test code here
//var test = modbus_crc("010400f40002");
//console.log(test);

//Define visionpro output as a bool
var result = false;
vp.VPClient();
result = vp.cognex_result;


//Remote RTU ON
function modbusrtu_on(station = '01',swNum = '0000'){
    try{
        if(result){
            let command = station+"05"+swNum+"ff00";
            let crcval = modbus_crc(command);
            command = command+crcval;
            port.write(command);
        }
    }catch{
        console.log("There is an error to write the message thru the serial port");
    }
}

//Remote RTU Off
function modbusrtu_off(station = '01',swNum = '0000'){
    try{
        if(result){
            let command = station+"05"+swNum+"0000";
            let crcval = modbus_crc(command);
            command = command+crcval;
            port.write(command);
        }
    }catch{
        console.log("There is an error to write the message thru the serial port");
    }
}

//export the functions
module.exports = {modbus_crc,modbusrtu_on,modbusrtu_off}