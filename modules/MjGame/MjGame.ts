import { CardState } from '../../enums/card.enum';
import { GameEvent } from '../../interfaces/event.interface';
import { SPlayer } from '../smartPlayer';
import { MjCard } from './../MjCard/mjCard';
import { StateMachine } from './stateMachine';
import { MessageTypeAck, MessageTypeReq } from '../../enums/message.enum';
import { MainLogic } from './mainLogic';
import { MainStage } from '../../enums/stage.enum';
import { MjDesk } from './MjDesk';
import { Player } from '../player';
export class MjGame extends StateMachine {
    nowPosition = 0;
    private desk: MjDesk = null;
    private ai: MainLogic = null;
    constructor() {
        // 初始化状态机
        super();
        // 初始化牌桌信息
        this.desk = new MjDesk();
        // 初始化游戏信息
        this.initGame();
    }

    initGame() {
        this.nowPosition = 0;
        // 初始化牌墙
        this.desk.initCardWall();
        // 初始化AI系统
        this.ai = new MainLogic();
    }

    // 玩家加入游戏
    playerJoinGame(player: SPlayer) {
        let result = this.desk.playerSit(player);
        if (result) {
            if (this.desk.isAllPlayerEnter()) {
                return '坐满了';
            } else {
                return '还没有坐满'
            }
        } else {
            return '入座失败';
        }
    }
    
    // 获取桌子
    getDesk() {
        return this.desk;
    }

    // 告知当前桌上的所有人
    talkAllDeskPlayer(msg,except?:SPlayer) {
        const seats = this.desk.getSeats();
        for (const index in seats) {
            if (seats[index].player !== null && seats[index].player !== except) {
                seats[index].player.network.sendData(msg);
            }
        }
    }

    // 获取宝牌
    getPreciousCards() {
        let precious = [];
        precious.push(this.desk.cardWall.tailDrawCard().getCardObj());
        precious.push(this.desk.cardWall.tailDrawCard().getCardObj());
        // 给本局设置宝牌
        this.desk.specialCards = precious;
        return precious;
    }

    // 下发宝牌信息
    takeSpecialCard(){
        this.talkAllDeskPlayer({
            type: MessageTypeReq.REQ_GAMESTART,
            data: {
                precious: this.getPreciousCards()
            }
        });
    }

    // 判断一下当前是不是天胡
    isTianHu() {
        return this.ai.canHu();
    }

    changePosition() {
        // 0 - 1 - 2 - 3 
        this.nowPosition++;
        if (this.nowPosition === 4) {
            this.nowPosition = 0;
        }
    }

    specialChangePos(pos) {
        this.nowPosition = pos;
    }

    // 询问是否打牌
    reqPlayerDisCard() {
        console.log('询问是否打牌');
        let msg = {
            type: MessageTypeReq.REQ_DISCARD
        }
        this.desk.getSeats()[this.nowPosition].player.network.sendData(msg);
    }

    // 某个玩家打牌
    ackPlayerDisCard(ws,msg) {
        let player = this.findPlayerByWs(ws);
        if (player !== null) {
            // 如果当前玩家是需要操作的玩家位置
            if (player.baseData.position === this.nowPosition) {
                // 构造打出的牌
                const disCard = new MjCard({
                    type:msg.data.type,
                    point:msg.data.point,
                },{
                    state : CardState.DIS,
                    from : player.baseData.position
                });
                let discardResult = player.Action_DisCard(disCard);
                // 打牌成功
                if(discardResult){
                    // 广播
                    this.talkAllDeskPlayer(JSON.stringify({
                        type : MessageTypeAck.ACK_DISCARD,
                        data : {
                            card : disCard,
                            from : player.baseData
                        }
                    }));
                    // 状态切换
                    this.changeToAfterDisCard({
                        beforeState:MainStage.STAGE_DISCARD,
                        targetCard : disCard
                    });
                }else{
                    return 'cardNone';
                }
            } else {
                return 'notYourTurn'
            }
        }else{
            return 'playerNone'
        }
    }

    // 找某个玩家
    findPlayerByName(name) {
        let seat = this.desk.getSeats();
        for (let i in seat) {
            if (seat[i].player && seat[i].player.baseData.name === name) {
                return seat[i].player;
            }
        }
        return null;
    }

    // 通过ws找某个玩家
    findPlayerByWs(ws): SPlayer {
        let seat = this.desk.getSeats();
        for (let i in seat) {
            if (seat[i].player && seat[i].player.network.ws === ws) {
                return seat[i].player;
            }
        }
        return null;
    }

    // 断线重连
    reconnect(ws, name) {
        const player = this.findPlayerByName(name);
        player.network.addWs(ws);
        ws.player = player;
        let param = {};
        param = Object.assign(param, {
            handCard: player.handCards,
            disCard: player.discardPool,
            doorCard: player.doorCard
        });

        ws.send(JSON.stringify({
            type: MessageTypeReq.REQ_RECONNECT,
            data: param
        }));

        if (this.nowPosition == player.baseData.position) {
            // 如果掉线之前是打牌 重新请求一遍打牌
            if (this.nowStage === MainStage.STAGE_DISCARD) {
                ws.send(JSON.stringify({
                    type: MessageTypeReq.REQ_DISCARD
                }));
            }
        }
    }

    /**
     *  准备状态回调
     */
    StateReadyCallBack(){
        
    };

    /**
     *  投骰子阶段回调
     */
    StateCrapCallBack(){

    };

    /**
     *  分发手牌阶段回调
     */
    StateDealCallBack(){
        // 发牌
        this.desk.initPlayerHandCard();
        // 告知宝牌信息
        this.takeSpecialCard();
        // 切换到处理手牌状态
        this.changeToHandleHandcard();
    };

    /**
     *  处理手牌阶段回调
     */
    StateHandleCallBack(){
        // 判断是不是天胡
        if(this.isTianHu()){
            console.log('天胡了？？？？？？');
        }else{
            this.changeToDisCard({
                beforeState : MainStage.STAGE_HANDLE_HANDCARD,
                targetCard : null
            });
        }
    };

    /**
     *  游戏开始阶段回调
     */
    StateGameStartCallBack(){

    };

    /**
     *  打牌阶段回调
     */
    StateDisCardCallBack(event:GameEvent){
        this.reqPlayerDisCard();
    };

    /**
     *  打牌后处理阶段回调
     */
    StateAfterDisCardCallBack(event:GameEvent){
        // 判断其他三家是否有吃碰杠
        const seat = this.desk.getSeats();
        for(let index in seat){
            if(seat[index].position == this.nowPosition){
                continue;
            }
            const hu = seat[index].player.checkHu(event.targetCard);
            const mingGang = seat[index].player.checkMingGang(event.targetCard);
            const peng = seat[index].player.checkPeng(event.targetCard);
        }
    };

    /**
     *  抓牌阶段回调
     */
    StateDrawCardCallBack(){

    };

    /**
     *  抓牌后处理阶段回调
     */
    StateAfterDrawCardCallBack(){

    };

    /**
     * 结算回调
     */
    StateFinalBalanceCallBack(){

    };

}