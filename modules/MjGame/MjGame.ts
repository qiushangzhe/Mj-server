import { MainLogic } from './mainLogic';
import { MainStage } from '../../enums/stage.enum';
import { MjDesk } from './MjDesk';
export class MjGame {
    
    private desk:MjDesk = null;
    private god:MainLogic = null;

    constructor(){
        this.desk = new MjDesk();
        this.desk.initDesk();
        this.god = new MainLogic();
    }
    // 玩家加入游戏
    playerJoinGame(playerList){

    }

    changeStage(stage:MainStage){
        switch(stage){
            case MainStage.STAGE_READY:
            break;
        }
    }
}