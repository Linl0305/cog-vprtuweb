#Congex visionpro communication via modbus rtu
This a cheaper of visionpro communication via modbus rtu.<br>
Please note that the switching time is more than 50ms due to serialport has low baud rate.<br>
If you require less time, you could seek to higher communinication rate, such as ethercat.<br>

#Install
npm i cog-vprtu<br>

#Using
Before you start, you need setting up cognex visionpro the result is bool(ture/false).<br>
const vprtu = require('cog-vprtu')<br>
vprtu.modbusrtu_on(station_num,switch_num)<br>
vprtu.modbusrtu_off(station_num,switch_num)<br>