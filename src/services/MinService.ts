import {Socket} from "net";
import {tick} from "@src/util/misc";

const net = require('net');
const client: Socket = new net.Socket();

let strings: string[] = [""];
let version: string[] = [""];

client.connect(9999, 'localhost', () => console.log('Connected'));
client.on('reconnect', function() {
    alert("Reconnected!");
});
client.write('status\r\n');
// onConnectionOpen(client);
client.on('end', () => {
    console.log("ending..."    )
    client.destroy();
})

client.on('error', async () => {
    await tick(1000);
    console.log("trying to reconnect...");
    client.connect(9999, 'localhost', () => console.log('Connected'));

})

client.on('data', (data: string) => {
    strings.push(data.toString());
    console.log("received:" + data);
    if (data.includes("Version")) {
        client.emit('version', JSON.stringify({"version" : data}))
    }

})

client.on("version", (json) =>{
    version.push(JSON.parse(json));
})

function sendMessage(text: string) {
    strings.push(`{command: ${text}}`)
    if (client.writable) {
        client.write(text + "\r\n");
    } else {
        console.error("Socket is not writeable!");
    }

}


export default {
    version,
    strings,
    sendMessage
} as const

