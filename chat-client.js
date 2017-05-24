/**
 * test chat client for we server
 */
var ws       = require( "ws" );
var NetUtils = require( "../libs/node-lib/client-server/NetUtils" );
var client   = new ws( "ws://172.20.10.10:"+NetUtils.CommonPorts.DEVICE_WS );

client.on('open', function open() {
  client.send('something');
});

client.on('message', function incoming( data ) {
  console.log( data );
});