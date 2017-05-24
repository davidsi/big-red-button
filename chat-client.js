/**
 * test chat client for we server
 */
var ws       = require( "ws" );
var NetUtils = require( "../libs/node-lib/client-server/NetUtils" );
var client   = new ws( "ws://172.20.10.10:"+NetUtils.CommonPorts.DEVICE_WS );
var shelljs  = require('shelljs');

client.on('open', function open() {
  client.send('something');
});

client.on('message', function incoming( data ) {

	console.log( "recieved " + data );

	var script1  = 'display dialog "Hello from david" with title "Hello"';
	var script   = 'tell application "iTunes" to play playlist "Music"';
	var execStr  = "osascript -e '" + script + "'";

	console.log( execStr );
	shelljs.exec( execStr );
});