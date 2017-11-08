import { SocketPlayerManage } from './player.socket';
import * as ws from 'ws'
import { MainFlow } from './../flow/main.flow';
import { QLOG } from './../../../common/tools/log.tool';
import { GameMainValidation } from './validation/main.validation';

export class GameSocket {
    // socket服务器句柄
    serve: any = null;
    psManage: SocketPlayerManage = null;
    // 事件列表
    eventList: Array<any> = null;
    // 日志句柄
    LOG: QLOG = null;
    // 流程对象
    flow: MainFlow = null;
    constructor(port?: number) {
        this.initServer(port);
        this.LOG = new QLOG('GameSocket');
        this.psManage = new SocketPlayerManage();
        this.initialization();
        this.initFlow();
    }

    initServer(port) {
        this.serve = new ws.Server({
            port: port || 9000
        });
    }

    initFlow() {
        this.flow = new MainFlow(this.psManage);
    }

    initialization() {
        this.eventList = [];
        this.initSocketEvent();
        this.serve.on('connection', (socket) => {
            socket.on('message', (message) => {
                let dealt_msg: { result: boolean, data?: any } = GameMainValidation.checkMsg_Main(message);
                if (!dealt_msg.result) { return; }
                let msg_type: number = dealt_msg.data.type;
                // 这里拿到的msg_main一定是一个对象
                let msg_main: any = dealt_msg.data.data;
                this.dealEvent(msg_type, msg_main, socket);
            })
            socket.on('close', () => {
                this.psManage.playerLeaveGame(socket);
            })
        });
    }

    initSocketEvent() {
        this.registEvent(900, this.Event_LoginGameServer.bind(this), '登陆服务器');
        this.registEvent(1000, this.Event_ReadyGame.bind(this), '准备游戏');
        this.registEvent(1001, this.Event_DisCard.bind(this), '有人打牌');
        this.registEvent(1002,this.Event_PengCard.bind(this),'有人碰牌');
    }

    /**
     * 
     * @param name 事件名 （暂时没用）
     * @param eventid 事件ID （客户端和服务器统一）
     * @param callback (事件回调函数)
     */
    registEvent(eventid, callback, name?) {
        for (let event of this.eventList) {
            if (event.type === eventid) {
                this.LOG.error(`当前事件ID已经注册过了`);
                return;
            }
        }
        let eventObj = {
            type: eventid,
            func: callback,
            name: name || "none"
        }
        this.eventList.push(eventObj);
    }


    dealEvent(type, msg, socket?) {
        for (let event of this.eventList) {
            if (event.type == type) {
                event.func(msg, socket);
                return;
            }
        }
        this.LOG.error(`当前消息号${type},消息体${JSON.stringify(msg)}，没有在消息管理器中发现，请检查`);
    }

    /**
     * 登陆游戏服务器
     */
    Event_LoginGameServer(msg, socket) {
        if (socket.userid != null) {
            console.log('当前socket的userid不为null');
            return;
        }
        this.psManage.initPlayer(msg.userid, socket);
        socket.userid = msg.userid;
    }

    /**
     * 准备游戏的消息
     */
    Event_ReadyGame(msg, socket) {
        let result = GameMainValidation.checkMsg_Ready(msg);
        if (!result.result) return;
        this.flow.playerReadGame(socket.userid, msg);
    }

    /**
     * 有一个玩家打牌了
     */
    Event_DisCard(msg, socket) {
        let result = GameMainValidation.checkMsg_Discard(msg);
        if (!result) return;
        this.flow.playerDisCard(socket.userid, msg);
    }

    /**
     * 有玩家碰牌了
     */ 
    Event_PengCard( msg , socket ){
        let result = GameMainValidation.checkMsg_PengCard(msg);
        if(!result) return;
        this.flow.playerPengCard(socket.userid,msg);
    }
}
