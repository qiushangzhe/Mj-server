import { MessageTypeReq } from '../../enums/message.enum';
import { MainLogic } from './mainLogic';
import { MainStage } from '../../enums/stage.enum';
import { MjDesk } from './MjDesk';
import { Player } from '../player';
export class MjGame {
    nowPosition = 0;
    private desk: MjDesk = null;
    private ai: MainLogic = null;
    nowStage = MainStage.STAGE_READY;
    constructor() {
        this.desk = new MjDesk();
        this.initGame();
    }

    initGame() {
        this.nowPosition = 0;
        this.desk.initDesk();
        this.ai = new MainLogic();
    }

    // 玩家加入游戏
    playerJoinGame(player: Player) {
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
    // 切换状态
    changeStage(stage: MainStage) {
        this.nowStage = stage;
        switch (stage) {
            // 开始游戏
            case MainStage.STAGE_READY:
                this.gameStart();
                break;
            // 发牌
            case MainStage.STAGE_DEAL:
                this.desk.initPlayerHandCard();
                this.changeStage(MainStage.STAGE_HANDLE_HANDCARD);
                break;
            case MainStage.STAGE_HANDLE_HANDCARD:
                this.isTianHu();
                break;
            case MainStage.STAGE_DISCARD:
                this.reqPlayerDisCard();

                break;
        }
    }
    // 获取桌子
    getDesk() {
        return this.desk;
    }

    // 告知当前桌上的所有人
    talkAllDeskPlayer(msg) {
        const seats = this.desk.getSeats();
        for (const index in seats) {
            if (seats[index].player !== null) {
                seats[index].player.ws.send(msg);
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

    // 马上开始游戏了哈
    gameStart() {
        this.talkAllDeskPlayer(JSON.stringify({
            type: MessageTypeReq.REQ_GAMESTART,
            data: {
                precious: this.getPreciousCards()
            }
        }));
    }

    // 判断一下当前是不是天胡
    isTianHu() {
        if (this.ai.canHu()) {

        } else {
            this.changeStage(MainStage.STAGE_DISCARD);
        }
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
        console.log(msg);
        console.log(typeof msg);
        this.desk.getSeats()[this.nowPosition].player.ws.send(JSON.stringify(msg));
    }

    // 某个玩家打牌
    playerDisCard(name) {

    }

    // 找某个玩家
    findPlayerByName(name) {
        let seat = this.desk.getSeats();
        for (let i in seat) {
            if (seat[i].player.baseData.name === name) {
                return seat[i].player;
            }
        }
    }

    // 断线重连
    reconnect(ws, name) {
        const player = this.findPlayerByName(name);
        player.ws = ws;
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
            if(this.nowStage === MainStage.STAGE_DISCARD){
                ws.send(JSON.stringify({
                    type: MessageTypeReq.REQ_DISCARD
                }));
            }
        }
    }
}