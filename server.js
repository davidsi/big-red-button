/**
 * the bid red button server
 */
var WebSocket  = require( "ws" );
var NetUtils   = require( "../libs/node-lib/client-server/NetUtils" );
var server     = new WebSocket.Server( { port : NetUtils.CommonPorts.DEVICE_WS } );
var pinManager = require( "../libs/node-lib/device/chip/gpio/pinManager" );
var button     = pinManager.getPin( 0, false, 'in', 'both', { debounceTimeout: 500 } );

server.on( 'connection', function connection( wsClient ) {

	console.log( "server recieved client connection" );

	wsClient.on( 'message', function incoming( message ) {
		console.log('received: %s', message);
  });

	wsClient.send( 'connected' );

});

/**
 * watch the button, if we get a hit, we need to broadcast a message to all clients
 */
button.watch( function( error, value ) {

    console.log( "top level callback for button" );

	server.clients.forEach(function each( client ) {
		if( client.readyState === WebSocket.OPEN ) {
			client.send('big red button!');
		}
		else {
			console.log( "client not open any more" );
		}
	});
});

console.log( "ip addresses: " + JSON.stringify( NetUtils.getIpAddresses()) );
console.log( "waiting for a connection" );

