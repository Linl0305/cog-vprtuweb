# Software communicator for Cognex Visionpro via Socket in Nodejs

- This is a lib for cognex visionpro, fetch the inspection result form the application.
- No need for i/o card installed.
- Before you start, you need configure vision pro communication first.
- Configure the vp as server, the default port is 5001.

# Install

The install is quite simple. Download the source code,  have your vision pro configured, startup visionpro and click run, then you could using command "node cogvpclient", then you could see the result from visionpro.<br>

# NPM Install
This lib also published on npm<br>
npm install cogvpclient<br>
const cogcoms = require('cogvpclient');<br>
Run the function get result form cognex visionpro: cogcoms.VPClient()<br>
The string from cognex visionpro: cogcoms.cognex_result<br>
