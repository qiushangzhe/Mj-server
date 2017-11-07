import { Position } from '../../../common/enums/player.enum';
import { logconfig, QLOG } from './../../../common/tools/log.tool';
import { GameLogic } from './../logic/game.logic';
import { CardState } from '../../../common/enums/card.enum';
import { PlayerInfoInterface } from '../../../common/interfaces/playerInfo.interface';
import { MainStage } from '../../../common/enums/stage.enum';
import { SPlayer } from './../model/smartPlayer';
import { GameModel } from './../model/game.model';
import { SocketPlayer,SocketPlayerManage } from '../socket/player.socket';
import { PosMachine } from './posMachine';
import { GameEvent } from './../../../common/interfaces/event.interface';
import { StateMachine } from './stateMachine';
import { MjCard } from '../model/MjCard/mjCard';
import { output , outputList} from '../../../common/tools/translate';
import * as log from 'log4js';
export class MainFlow extends StateMachine{
    posTools:PosMachine = null;
    // 当前准备玩家数
    readyNumber:number = 0;
    readyPlayer = [];
    psManage:SocketPlayerManage = null;
    // 游戏模块
    gameModel:GameModel = null;
    // logic
    gamelogic:GameLogic = null;
    logger;
    constructor(psm){
        super();
        this.psManage = psm;
        this.posTools = new PosMachine(4);
        this.gameModel = new GameModel();
        this.gamelogic = new GameLogic(this.gameModel);
        this.logger = log.getLogger('game_main_flow');
    }

    /**
     * 有玩家准备游戏了
     * @param userid 谁？
     * @param msg 准备啥了
     */ 
    playerReadGame(userid,msg){
        // 判断如果之前已经准备了不需要准备
        for(let id of this.readyPlayer){
            if(id === userid){
                if(this.nowStage !== MainStage.STAGE_READY){
                    this.reconnect(userid);
                }
                console.log('您已经准备过了');
                return;
            }
        }
        
        this.logger.trace(`玩家id为${userid}的玩家 准备了游戏`);
        this.readyPlayer.push(userid);
        this.readyNumber++;
        this.gameModel.addPlayer({
            userid : userid,
            name : 'test'
        });
        // 告知玩家登陆成功
        this.psManage.loginSuccess(userid);
        if(this.readyNumber === 4){
            this.logger.trace(`4名玩家全部准备游戏，游戏开始。`);
            this.changeToStartGame();
        }
    }

    /**
     * 有人打牌
     * @param userid 谁
     * @param msg 打了什么
     */ 
    playerDisCard(userid,msg){
        const player:SPlayer = this.gameModel.getPlayerById(userid);
        const card = new MjCard({
            type:msg.type,
            point:msg.point
        },{
            state : CardState.DIS,
            from : player.baseData.position
        });
        this.logger.trace(`收到打牌相应:id为${userid}的玩家打出了一张${JSON.stringify(card)}=>${output(card)}`);
        const disCardResult = player.Action_DisCard(card);
        if(!disCardResult){
            this.psManage.ackPlayerDisCardError(userid);
            this.logger.error(`当前玩家${userid}的手牌中没有${JSON.stringify(card)}=>${output(card)}`);
        }else{
            card._state.from = player.baseData.position;
            card._state.state = CardState.DIS;
            // 广播
            this.psManage.broadcastPlayerDisCard(player.getBaseData(),card);
            // 切换状态
            this.changeToAfterDisCard({
                who : player,
                beforeState:MainStage.STAGE_DISCARD,
                targetCard : card
            });
        }
    }

    /**
     * 断线重连
     * @param userid 谁
     */
    reconnect(userid){
        let playerInfo:PlayerInfoInterface = this.gameModel.getPlayerById(userid).getBaseData();
        this.psManage.reconnect(userid,this.gameModel.getReconnectData(userid));
        if(playerInfo.position === this.posTools.nowPos){
            if(this.nowStage === MainStage.STAGE_DISCARD){
                this.psManage.sendPlaseDisCard(userid);
            }
        }
    }

    StateReadyCallBack() {
        throw new Error("Method not implemented.");
    }
    StateCrapCallBack() {
        throw new Error("Method not implemented.");
    }
    StateDealCallBack() {
        this.logger.trace(`------当前进入发牌流程-----`);
        // 发牌
        this.gameModel.dealCard();
        // 告诉每个人自己的手牌
        for(let id of this.readyPlayer){
            const player:SPlayer = this.gameModel.getPlayerById(id);
            const socket = this.psManage.sendHandCard(id,player.getHandCardObj());
            this.logger.debug(`玩家${id}的手牌${outputList(player.getHandCardObj())}`);
        }
        this.changeToDisCard({
            beforeState : MainStage.STAGE_DEAL,
            targetCard : null
        });
        
    }
    StateHandleCallBack() {
        throw new Error("Method not implemented.");
    }
    StateGameStartCallBack() {
        this.changeToDeal();
    }
    StateDisCardCallBack(event: GameEvent) {
        this.logger.trace(`切换到====>>>打牌阶段`);
        const pos = this.posTools.nowPos;
        // console.log(pos);
        const player:SPlayer = this.gameModel.getPlayerByPos(pos);
        // console.log(player);
        this.psManage.sendPlaseDisCard(player.getPlayerId());
        this.logger.trace(`向玩家${player.getPlayerId()}发送请求打牌的消息，等待响应ing....`);
    }
    StateAfterDisCardCallBack(event: GameEvent) {
        // 打牌后的判断
        const result = this.gamelogic.checkAfterDis(event);
        // 谁都不能碰杠胡牌
        if(result.length === 0){
            this.posTools.normalChange();
            this.changeToDrawCard();
        }else{
            // 给能碰杠胡的人发消息
            for(let item of result){
                this.psManage.ackPlayerNextAction(item.player.getPlayerId(),item.action);
            }
        }
    }
    StateDrawCardCallBack() {
        this.logger.trace(`切换到====>>>抓拍阶段`);
        // 抓牌
        const pos = this.posTools.nowPos;
        const player = this.gameModel.getPlayerByPos(pos);
        const result = this.gameModel.playerDrawCard(player);
        // 发送信息
        this.psManage.sendPlayerDrawCard(player.getPlayerId(),result);
        this.logger.trace(`当前玩家${player.getPlayerId()}抓了一张${JSON.stringify(result)}=>${output(result)}`);
        this.changeToAfterDrawCard({
            who : player,
            beforeState : MainStage.STAGE_DRAWCARD,
            targetCard : result
        });
    }
    StateAfterDrawCardCallBack(event) {
        this.logger.trace(`切换到====>>>抓拍后分析阶段`);
        const player = event.who;
        const targetCard = event.targetCard;
        const result = this.gamelogic.checkAfterDraw(player,targetCard);
        if(result !== null){

        }else{
            this.changeToDisCard({
                who:player,
                beforeState:MainStage.STAGE_AFTER_DRAWCARD
            });
        }

    }
    StateFinalBalanceCallBack() {
        throw new Error("Method not implemented.");
    }
    
}