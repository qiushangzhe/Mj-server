import * as WebSocket from 'ws';
const path = require('path');
const wss = new WebSocket.Server({ port: 9001 });
var exec = require('child_process').exec;

interface room {

}
interface messageInterface {
    type: string;
    data: object;
}
let roomList: Array<room> = [];
wss.on('connection', function connection(ws) {
    ws.on('message', (message) => {
        let msg = JSON.parse(String(message));
        switch (msg.type) {
            case 'createGame':
                CreateGame();
                break;
        }
        console.log('received: %s', message);
    });
});

function CreateGame() {
    const port = Number.parseInt(String(Math.random() * 55535 + 10000));
    console.log(port);
    exec(`ts-node ${path.join(__dirname,'main.ts')} ${port}`, (error, stdout, stderr) => {
        // console.log(error);       
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
        }
        console.log('Child Process STDOUT: ' + stdout);
    });
}