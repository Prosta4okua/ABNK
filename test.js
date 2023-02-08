const net = require('net');
const client = new net.Socket();
client.connect(9999, 'localhost', () => console.log('Connected'));
client.on('data', data => console.log('Received: ' + data));
client.on('close', () => console.log('Connection closed'));
client.write('help\r\n');
setTimeout(() => {
    console.log("mee")
    client.write('status\r\n');
    console.log("eem")
}, 2000);