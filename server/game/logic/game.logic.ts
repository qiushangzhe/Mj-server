import { ResponseAction } from './../../../common/interfaces/result.interface';
import { SPlayer } from './../model/smartPlayer';
import { GameEvent } from '../../../common/interfaces/event.interface';
import { GameModel } from './../model/game.model';
import * as log from 'log4js';
export class GameLogic {
    gamemodel: GameModel;
    resultList: Array<ResponseAction> = [];
    logger = log.getLogger('game_logic');
    constructor(_gamemodel) {
        this.gamemodel = _gamemodel;
    }


    checkAfterDis(event: GameEvent) {
        const player = event.who;
        const discard = event.targetCard;
        const seats = this.gamemodel.desk.getSeats();
        let resultList = [];
        for (let seat of seats) {
            if (seat.player.getPlayerId() == player.getPlayerId()) {
                continue;
            }
            let hu = seat.player.checkHu(discard);
            let gang = seat.player.checkMingGang(discard);
            let peng = seat.player.checkPeng(discard);
            if (!hu.result && !gang.result && !peng.result) {
                continue;
            }
            let action = {};
            hu.result && (action['hu']=hu);
            gang.result && (action['gang']=gang);
            peng.result && (action['peng']=peng);
            resultList.push({
                player: seat.player,
                action: action
            });
        }
        this.logger.debug(`打牌后判断结果`);
        if (resultList.length === 0) {
            this.logger.debug(`没有任何人可以碰杠胡`);
        } else {
            resultList.forEach((obj) => {
                this.logger.debug(`${obj.player.getPlayerId()}号玩家=>${JSON.stringify(obj.action)}`);
            })
        }
        return resultList;
    }

    checkAfterDraw(player: SPlayer, card) {
        this.logger.trace(`检测抓拍后碰杠胡开始`);
        let hu = player.checkHu(card);
        let angang = player.checkAnGang(card);
        let bugang = player.checkBuGang(card);
        let gang = [];
        this.logger.trace(`胡信息${JSON.stringify(hu)}`);
        this.logger.trace(`补杠信息${JSON.stringify(bugang)}`);
        this.logger.trace(`暗杠信息${JSON.stringify(angang)}`);
        angang.result && gang.push(angang);
        bugang.result && gang.push(bugang);
        let result;
        if (!hu.result && gang.length == 0) {
            result = null;
        } else {
            let action = {};
            hu !== null && function () { action['hu'] = hu };
            gang.length !== 0 && function () { action['gang'] = gang }();
            result = {
                player: player,
                action: action
            }
        }

        this.logger.trace(`抓拍后判断结果为:`);
        result == null ?
            this.logger.trace(`不能进行杠牌/和牌`) :
            this.logger.trace(`玩家${result.player.getPlayerId()}=>${JSON.stringify(result.action)}`);
        return result;
    }

    // 注册响应事件
    registeResponseAction(action) {
        this.resultList = action;
    }
    // 清空响应组
    cleanResponse() {
        this.resultList.length = 0;
    }
    // 判断当前是否相应事件
    checkResponseAction(id: number, type: number, result: boolean) {
        if (this.resultList.length == 0) {
            this.logger.error(`无响应事件被注册，请检查逻辑`);
            return false;
        }
        let nextDo = null;
        if (result) {
            this.checkWeightTrue(id, type);
        } else {
            this.checkWeightFalse(id, type);
        }
    }
    //
    checkWeightTrue(id, weight) {
        return this.checkWeight(id,weight);
    }

    checkWeightFalse(id, weight) {
        if(this.checkWeight(id,weight) != null){
            // 扫描当前响应队列中是否有最大优先级的被确认过
            let buffer:Array<ResponseAction> = [];
            for(let result of this.resultList){
                if(buffer.length == 0){
                    buffer.push(result);
                }else{
                    if(buffer[0].maxLevel < result.maxLevel){
                        buffer.length = 0;
                        buffer.push(result);
                    }else if(buffer[0].maxLevel == result.maxLevel){
                        buffer.push(result);
                    }
                }
            }
            for(let action of buffer){
                if(!action.sure){
                    return null;
                }
            }
            return buffer;
        }else{
            return null;
        }
    }

    checkWeight(id,weight){
        let target_result = this.findResultByPlayerId(id);
        if (target_result == null) {
            this.logger.error(`玩家${id}发送了操作${weight}，但是在响应队列中没找到`);
            return null;
        }
        for (let result of this.resultList) {
            for (let action in result.action) {
                if (result.action[action].level >= weight && target_result != result) {
                    if(result.sure){
                        // 如果发现比自己权重大的，但是已经被确认过了，忽略掉
                        continue;
                    }else{
                        // 发现了未被确认的大权重操作。
                        target_result.sure = true;
                        return null;
                    }
                }
            }
        }
        return target_result;
    }

    findResultByPlayerId(id) {
        for (let result of this.resultList) {
            if (result.player.getPlayerId() === id) {
                return result;
            }
        }
        return null;
    }
}