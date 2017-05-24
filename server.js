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

	wsClient.send( 'something' );

	setTimeout( function() {
		server.broadcast = function broadcast( data ) {
			server.clients.forEach(function each( client ) {
				if( client.readyState === WebSocket.OPEN ) {
					client.send('big red button!');
				}
			});
		};
	}, 1000 );
});

console.log( "ip addresses: " + JSON.stringify( NetUtils.getIpAddresses()) );
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