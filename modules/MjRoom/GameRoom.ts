export class GameRoom {
    private roomId: number = null;
    private playerList = [];
    constructor(id:number,creater){ 
        this.roomId = id;
        this.playerList.length = 0;
        this.playerList.push(creater);
    }

}