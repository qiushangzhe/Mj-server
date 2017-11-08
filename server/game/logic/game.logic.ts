import { ResponseAction } from './../../../common/interfaces/result.interface';
import { SPlayer } from './../model/smartPlayer';
import { GameEvent } from '../../../common/interfaces/event.interface';
import { GameModel } from './../model/game.model';
import * as log from 'log4js';
export class GameLogic{
    gamemodel:GameModel;
    resultList = [];
    logger = log.getLogger('game_logic');
    constructor(_gamemodel){
        this.gamemodel = _gamemodel;
    }


    checkAfterDis(event:GameEvent){
        const player = event.who;
        const discard = event.targetCard;
        const seats = this.gamemodel.desk.getSeats();
        let resultList = [];
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
            resultList.push({
                player : seat.player,
                action:{
                    hu : hu,
                    gang : gang,
                    peng : peng
                }
            });   
        }
        this.logger.debug(`打牌后判断结果`);
        if(resultList.length === 0){
            this.logger.debug(`没有任何人可以碰杠胡`);
        }else{
            resultList.forEach((obj)=>{
                this.logger.debug(`${obj.player.getPlayerId()}号玩家=>${JSON.stringify(obj.action)}`);
            })
        }
        return resultList;
    }

    checkAfterDraw(player:SPlayer,card){
        let hu = player.checkHu(card);
        let angang = player.checkAnGang(card);
        let bugang = player.checkBuGang(card);
        let gang = [];
        angang.result && gang.push(angang);
        bugang.result && gang.push(bugang);
        let result;
        if(!hu.result && gang.length ==0){
            result = null;
        }else{
            let action = {};
            hu !== null && function(){action['hu']=hu};
            gang.length !==0 && function(){action['gang']=gang};
            result = {
                player : player,
                action : action
            }
        }

        this.logger.trace(`抓拍后判断结果为:`);
        result == null ? 
            this.logger.trace(`不能进行杠牌/和牌`):
            this.logger.trace(`玩家${result.player.getPlayerId()}=>${JSON.stringify(result.action)}`);
        return result;
    }

    // 注册响应事件
    registeResponseAction(action){
        this.resultList = action;
    }
    // 清空响应组
    cleanResponse(){
        this.resultList.length = 0;
    }
    // 判断当前是否相应事件
    checkResponseAction(id,type){
        if(this.resultList.length == 0){
            this.logger.error(`无响应事件被注册，请检查逻辑`);
            return false;
        }
        if(type == 'hu'){
            
        }else if(type == 'peng'){

        }else if(type == 'gang'){

        }
    }

    // 
}