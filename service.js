'use strict'

const WebSocket = require('ws')
const kafka = require('kafka-node')
const PORTS = {
    wss  : 8082,
    rest : 8081,
    kafka: 9092
}
const client   = new kafka.KafkaClient({kafkaHost: `127.0.0.1:${PORTS.kafka}`})
const consumer = new kafka.Consumer(client, [ { topic: 'test' } ])
const producer = new kafka.Producer(client)

const wss = new WebSocket.Server({ port: PORTS.wss, path: "/yapear" })
const clientws = new Map()

wss.on('connection', (ws) => {
    console.log('conexion...')
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };

    clientws.set(ws, metadata);

    ws.on('message', async (messageAsString) => {
        
      const message  = JSON.parse(messageAsString)
      console.log('message WS ...', message)
      const metadata = clientws.get(ws)

      message.sender = metadata.id;
      message.color  = metadata.color;

      const num  = message.num
      const monto = parseInt(message.monto)
        
      if(message.accion == 'YAPEO') {
          // logic
          const rpta = { }

          if(monto > 500) {
            producer.send([ { topic: 'test', messages: JSON.stringify(message) }], function (err,data) {})
            rpta.msj = `Se necesita que ingreses el código de aprobación`
          } else {
            rpta.msj = `Se realizó el yapeo.`
          }
          
        [...clientws.keys()].forEach((client) => {
            client.send(JSON.stringify( rpta ));
        })
      }
    })
})

wss.on("close", () => {
    clients.delete(ws);
});

consumer.on('message', async (message) => {
    console.log('consumer:', message);

    await sleep(6000)

    const code = uuidv4();

    [...clientws.keys()].forEach((client) => {
        client.send(JSON.stringify( {codigo: code } ));
    })
})

producer.on('ready', function() {
    console.log('producer ready .....')
})

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}