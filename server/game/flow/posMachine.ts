import { Position } from '../../../common/enums/player.enum';
export class PosMachine{
    nowPos:Position = null;
    nowPlayerNum:number = 0;
    constructor(playernum){
        this.nowPlayerNum = playernum - 1;
        this.nowPos = 0;
    }

    normalChange(){
        this.nowPos ++;
        if(this.nowPos > this.nowPlayerNum){
            this.nowPos = Position.DONG
        }
        // console.log('换',this.nowPos);
    }
}