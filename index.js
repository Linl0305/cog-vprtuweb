//Web type com port reader
//Please modify the default port before you use it.

var serport      = "";
var defaultport ="COM1";
var rate         = 9600;
var serports     = [];
var fs           = require('fs');
const SerialPort = require('serialport').SerialPort;

var express = require('express'),
    app    = express(),
    server = require('http').Server(app),
    io     = require('socket.io')(server),
    port   = 80;

server.listen(port, () => console.log('Server Listening on port' + port))


app.get('*', function(req, res){
  fs.readFile(__dirname + '/index.html','utf8', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200, {'Content-Type' : "text/html; charset=utf-8"});
    var result = data.replace("Node Serial Connection","Node Serial Connection " + serports[0]);
    res.end(result);
  });
});

io.on('connection', onConnection);

var connectedSocket = null;
function onConnection(socket) {  
  connectedSocket = socket;
  connectedSocket.on('send', function (data) {
    console.log(data);
    serport.write(data.Data);
  });
 }

if (process.argv.length > 2) {
  console.log(process.argv);
  serports.push(process.argv[2]);
  if (process.argv.length > 3) rate = parseInt(process.argv[3]);
}

SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    if (typeof port['manufacturer'] !== 'undefined') {
      serports.push(port.path);
      console.log(port);
    }
  });
  if (serports.length == 0) {
    console.log("No serial ports found!");
    process.exit();
  }
  serport = new SerialPort({path:defaultport,  baudRate: rate })
  serport.on('error', function(err) {
    console.log('Error: ', err.message)
  })
  serport.on('data', function (data) {
    console.log(data.toString('utf8'));
    io.emit('data', { data: data.toString('utf8') });
  })

});