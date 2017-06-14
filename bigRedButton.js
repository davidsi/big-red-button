/**
 * the big red button server
 */
var WebSocket             = require( "ws" );
var NetUtils              = require( "../libs/node-lib/client-server/NetUtils" );
var pinManager            = require( "../libs/node-lib/device/chip/gpio/pinManager" );
var httpServer            = require( "../libs/node-lib/client-server/server" );
var router                = require( "../libs/node-lib/client-server/router" );

var socketServer          = new WebSocket.Server( { port : NetUtils.CommonPorts.DEVICE_WS } );
var button                = pinManager.getPin( 0, false, 'in', 'both', { debounceTimeout: 500 } );
var buttonID			  = 102;

socketServer.on( 'connection', function connection( wsClient ) {

	console.log( "server recieved client connection" );

	wsClient.on( 'message', function incoming( message ) {
		console.log('received: %s', message);
  	});

	wsClient.send( 'connected' );

});

/**
 * get the node description
 */
function query() {
	
    this.responder = function( response, request, params ) {

    	var resp = {
			"SSID-config"             : false,								
			"bluetooth-service-guid"  : "",									
			"nodeType"                : ["big-red-button"],
			"big-red-button-reciever" : false,
			"name"                    : "iTunes big red button",
			"hardware"                : "chip",
			"battery"                 : false,								
			"id"		              : buttonID,								
			"configable"              : "http",
			"big-red-button" : {											
				"queryAvailable" : ["buttonID"],
				"buttonID"       : buttonID
			}
		};

        response.writeHead( 200, {"Content-Type": "application/json", });
        response.write( JSON.stringify(resp) );
        response.end(); 
    };
}

/**
 * get/set the BRB specifics
 */
function data() {

   this.responder = function( response, request, params ) {

    	var resp = {

		"SSID-config"             : false,								
		"bluetooth-service-guid"  : "",									
		"nodeType"                : ["big-red-button"],
		"big-red-button-reciever" : false,
		"name"                    : "iTunes big red button",
		"hardware"                : "chip",
		"battery"                 : false,								
		"id"		              : buttonID,								
		"configable"              : "http",
			"big-red-button" : {											
				"queryAvailable" : ["buttonID"],
				"buttonID"       : buttonID
			}
		};

        response.writeHead( 200, {"Content-Type": "application/json", });
        response.write( JSON.stringify(resp) );
        response.end(); 
    }
}

/**
 * watch the button, if we get a hit, we need to broadcast a message to all clients
 */
button.watch( function( error, value ) {

    console.log( "top level callback for button" );

	socketServer.clients.forEach(function each( client ) {
		if( client.readyState === WebSocket.OPEN ) {
			client.send( JSON.stringify( {"big-red-button" : buttonID} )) ;
		}
		else {
			console.log( "client not open any more" );
		}
	});
});

console.log( "starting big red button" );

router.addRoute( "/query", new query() );
router.addRoute( "/data",  new data() );

httpServer.start( new Router() );

console.log( "ip addresses: " + JSON.stringify( NetUtils.getIpAddresses()) );
console.log( "waiting for a connection" );

