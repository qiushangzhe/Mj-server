import { SPlayer } from './../model/smartPlayer';
import { GameEvent } from '../../../common/interfaces/event.interface';
import { GameModel } from './../model/game.model';
export class GameLogic{
    gamemodel:GameModel;
    resultList = [];
    constructor(_gamemodel){
        this.gamemodel = _gamemodel;
    }


    checkAfterDis(event:GameEvent){
        const player = event.who;
        const discard = event.targetCard;
        const seats = this.gamemodel.desk.getSeats();
        this.resultList.length = 0;
        for(let seat of seats){
            if(seat.player.getPlayerId() == player.getPlayerId()){
                continue;
            }
            let hu = seat.player.checkHu(discard);
            let gang = seat.player.checkMingGang(discard);
            let peng = seat.player.checkPeng(discard);
            if(!hu.result && !gang.result && !peng.result){
                continue;
            }
            this.resultList.push({
                player : seat.player,
                action:{
                    hu : hu,
                    gang : gang,
                    peng : peng
                }
            });   
        }
        return this.resultList;
    }

    checkAfterDraw(player:SPlayer,card){
        let hu = player.checkHu(card);
        let angang = player.checkAnGang(card);
        let bugang = player.checkBuGang(card);
        let gang = [];
        angang!==null && gang.push(angang);
        bugang!==null && gang.push(bugang);
        
        if(hu === null && gang.length ==0){
            return null;
        }else{
            let action = {};
            hu !== null && function(){action['hu']=hu};
            gang.length !==0 && function(){action['gang']=gang};
            return {
                player : player ,
                action : gang
            }
        }
        
    }


}