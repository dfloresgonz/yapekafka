# ¡Bienvenido al proyecto Yape kafka!

Este es un ejemplo sencillo y muy básico que utiliza sockets y kafka.

## Pre-requisitos

- Descargar kafka (zookeeper)
- Correr kafka (zookeeper)
- Crear topic llamado test

## Instalación Kafka

```sh
cd kafka-folder
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties
bin/kafka-topics.sh --create --topic test --bootstrap-server localhost:9092
```

## Instalación proyecto

```sh
cd app-kafka
npm i
node service.js
correr con live server el app.html
```

## hola


```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```
