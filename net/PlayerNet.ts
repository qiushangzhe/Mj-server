import * as WebSocket  from 'ws'
export class PlayerNet {
    ws;
    constructor(ws) {
        this.ws = ws;
    }

    forgotPlayer(){
        this.attachPlayer(null);
    }

    attachPlayer(_player){
        this.ws.player = _player;
    }

    clearWs(){
        this.ws = null;
    }

    addWs(_ws){
        if(this.ws == null){
            this.ws = _ws;
        }
    }

    closeWs(){
        this.ws.close();
    }

    sendData(obj:Object){
        this.ws.send(JSON.stringify(obj));
    }
}