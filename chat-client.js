/**
 * test chat client for we server
 */
var ws       = require( "ws" );
var NetUtils = require( "../libs/node-lib/client-server/NetUtils" );
var client   = new ws( "ws://172.20.10.10:8883" );

client.on('open', function open() {
  ws.send('something');
});

client.on('message', function incoming( data ) {
  console.log( data );
});