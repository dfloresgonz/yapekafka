const kafka = require('kafka-node')

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'})

//////
const consumer = new kafka.Consumer(client, [ { topic: 'test'}])

consumer.on('message', function (message) {
    console.log(message)
})

//////
const producer = new kafka.Producer(client)

producer.on('ready', function() {
    setInterval(function() {
        producer.send([ { topic: 'test', messages: 'Mensaje automatico'}], function (err,data) {})
    }, 5000)
})