#Briefing
This lib is to validate the panasonic plc mewtocol command.<br>
The command ends with a special char '\r', and some of the new user will neglect with that char.<br>
This lib could check and validate them.

#Install
npm i mewtocol-spellcheck

#Usage example
const spellcheck = require('mewtocol-spellcheck');<br>
var check = spellcheck.ValidateUinput('STRING TO VALIDATE');<br>
If the command is okay, check value is true, else check value is false.

