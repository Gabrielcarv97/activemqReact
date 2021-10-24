import { Form, Input, Row, Button } from 'antd';
const stompit = require('stompit')

export default function App() {
  const onFinish = (e) => {
  const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders': {
      'host': '/',
      'login': 'admin',
      'passcode': 'admin',
      'heart-beat': '5000,5000'
    }
  };
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

  }

  return <>
    <Row justify="center" align="stretch ">
      <Form onFinish={onFinish}>
        <Form.Item label="Número do pedido" name="numPedido" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Valor" name="valor" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Row>
  </>

}