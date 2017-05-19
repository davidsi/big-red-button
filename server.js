/**
 * the bid red button server
 */
var ws       = require("nodejs-websocket")
var NetUtils = require( "../libs/node-lib/client-server/NetUtils" );

var server = ws.createServer(function( conn ) {
	console.log( "New connection" )
	
	conn.on( "text", function(str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})

	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
}).listen(NetUtils.CommonPorts.DEVICE_WS);