/**
 * the bid red button server
 */
var WebSocket = require( "ws" );
var NetUtils  = require( "../libs/node-lib/client-server/NetUtils" );
var server    = new WebSocket.Server( { port : NetUtils.CommonPorts.DEVICE_WS } );

server.on( 'connection', function connection( wsClient ) {
	console.log( "server recieved client connection" );
	wsClient.on( 'message', function incoming( message ) {
		console.log('received: %s', message);
  });

	ws.send( 'something' );
});

console.log( "waiting for a connection" );

// var ws       = require("nodejs-websocket")
// var NetUtils = require( "../libs/node-lib/client-server/NetUtils" );

// var server = ws.createServer(function( conn ) {
// 	console.log( "New connection" )
	
// 	conn.on( "text", function(str) {
// 		console.log("Received "+str)
// 		conn.sendText(str.toUpperCase()+"!!!")
// 	})

// 	conn.on("close", function (code, reason) {
// 		console.log("Connection closed")
// 	})
// }).listen(NetUtils.CommonPorts.DEVICE_WS);