const webSocket = new WebSocket('ws://localhost:8082/yapear');

async function yapear() {
    let num   = document.getElementById('num').value
    let monto = document.getElementById('monto').value

    const obj_param = {
        num  : num,
        monto: monto,
        accion: 'YAPEO'
    }

    webSocket.send(JSON.stringify(obj_param));
}

webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('data:', data)

}