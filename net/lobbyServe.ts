import { NetModule } from './NetModule';

export class LobbyServe extends NetModule {
    constructor() {
        super();
    }

    registEvent() {
        this.serve.on('connection', (ws) => {
            ws.on('message',(msg)=>{
                msg = JSON.parse(msg);
                switch (msg.type){
                    case 'createRoom':
                        this.createRoom(msg);
                        break;
                    case 'joinRoom': 
                        this.joinRoom(msg);
                        break;
                }
            });
        });
    }

    createRoom(message) {

    }

    joinRoom(message){

    }
}