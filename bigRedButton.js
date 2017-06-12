/**
 * the big red button server
 */
var WebSocket             = require( "ws" );
var NetUtils              = require( "../libs/node-lib/client-server/NetUtils" );
var socketServer          = new WebSocket.Server( { port : NetUtils.CommonPorts.DEVICE_WS } );
var pinManager            = require( "../libs/node-lib/device/chip/gpio/pinManager" );
var httpServer            = require( "../libs/node-lib/client-server/server" );
var Router                = require( "../libs/node-lib/client-server/router" );
var ButtonRequestHandlers = require( "./buttonRequestHandlers" );

var button       = pinManager.getPin( 0, false, 'in', 'both', { debounceTimeout: 500 } );

need to add the B-R-B as a regular device

socketServer.on( 'connection', function connection( wsClient ) {

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

	socketServer.clients.forEach(function each( client ) {
		if( client.readyState === WebSocket.OPEN ) {
			client.send('big red button!');
		}
		else {
			console.log( "client not open any more" );
		}
	});
});

console.log( "starting weather station" );

var query = new ButtonRequestHandlers.query;
router.addRoute( "/query", query);
router.addRoute( "/q",     query );

httpServer.start( new Router() );

console.log( "ip addresses: " + JSON.stringify( NetUtils.getIpAddresses()) );
console.log( "waiting for a connection" );

