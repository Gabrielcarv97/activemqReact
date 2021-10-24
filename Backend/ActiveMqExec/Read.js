const stompit = require('stompit');

const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders':{
      'host': '/',
      'login': 'admin',
      'passcode': 'admin',
      'heart-beat': '5000,5000'
    }
  };
  
stompit.connect(connectOptions, function(error, client) {
    const subscribeHeaders = {
        'destination': '/queue/fila.teste1',
        'ack': 'client-individual'
      };
client.subscribe(subscribeHeaders, function(error, message) {
    
    if (error) {
      console.log('subscribe error ' + error.message);
      return;
    }
    
    message.readString('utf-8', function(error, body) {
      
      if (error) {
        console.log('read message error ' + error.message);
        return;
      }
      
      console.log('============================ \nMensagem recebida: \n' + body + '\n============================');
      
      client.ack(message);
      
      client.disconnect();
    });
  });
});