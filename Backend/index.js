var Stomp = require('stomp-client');
var destination = '/queue/fila.teste1';
var client = new Stomp('127.0.0.1', 61613, 'admin', 'admin');

client.connect(function() {
    client.subscribe(destination, function(body, headers) {
      console.log('This is the body of a message on the subscribed queue:', body);
    });

    client.publish(destination, 'Oh herrow');

}); 