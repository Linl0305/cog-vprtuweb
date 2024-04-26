### Install

This is a lib for panasonic mewtocol protocol via serial communication.
A altanatives for serial assistance in nodejs.

# Usage
The lib is a serials functions.
Before you go, please modify your serial communication parameters in global variances.

The avaliable function as below:
Get plc version:
-PlcVer()
Read contact status:
-ReadOne('X0001')
-ReadMulti('Y0000','Y001A')
Change the relay status:
RelayON('R0001')

Every function has comment in the source code. You could refer and enjoy.