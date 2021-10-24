const stompit = require('stompit');
const connectOptions = require('../config/conexao')

var now = new Date();
var Data = now;
Data.setDate(now.getDate() + 10);


  stompit.connect(connectOptions, function (error, client) {

    if (error) {
      console.log('connect error ' + error.message);
      return;
    }

    const sendHeaders = {
      'destination': '/queue/fila.teste1',
      'content-type': 'text/plain'
    };

    const frame = client.send(sendHeaders);
    frame.write('Pedido: 0001 \nValor: 120,00 \nEntrega: ' + Data);
    frame.end();
  });
