import { MessageTypeAck } from '../../enums/message.enum';
import { MainStage } from '../../enums/stage.enum';
import * as ws from 'ws';
import * as log from 'log4js';
import { MjGame } from '../../modules/MjGame/MjGame';
import { Player } from '../../modules/player';
log.configure({
    appenders: {
        log: {
            type: 'multiFile',
            base: 'logs/GameServe',
            property: 'categoryName',
            extension: '.log'
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['log', 'console'],
            level: 'trace'
        }
    }
});
import { NetModule } from '../NetModule';

export class GameServe extends NetModule {
    g = null;
    e = null;
    gameObject: MjGame = null;
    constructor(port) {
        super(port);
        this.registEvent();

        this.g = log.getLogger('system');
        this.e = log.getLogger('error');
        this.gameObject = new MjGame();
    }

    registEvent() {
        this.serve.on('connection', (ws) => {
            ws.on('message', (msg) => {
                this.g.trace(msg);
                msg = JSON.parse(msg);
                if (msg.type === undefined) {
                    this.e.error('传过来的msg没有type');
                    return;
                }
                switch (msg.type) {
                    case MessageTypeAck.ACK_READYGAME:
                        this.Msg_ReadyGame(ws, msg);
                        break;
                    case MessageTypeAck.ACK_DISCARD:
                        this.Msg_DisCard(msg);
                }
            });
            ws.on('close', () => {
                if(ws.player){
                    this.g.trace(`玩家${ws.player.baseData.name}离开了游戏`);
                    ws.player.ws = null;
                }
            })
        });
    }
    /*
        准备游戏
        - 创建玩家对象
    */
    Msg_ReadyGame(ws, msg) {
        let data = msg.data;
        let username = data.username;
        if (this.gameObject.nowStage !== MainStage.STAGE_READY) {
            this.gameObject.reconnect(ws,username);
        } else {
            //1. 创建玩家对象
            let userObj = new Player({
                name: username
            });

            ws.player = userObj;

            //2. 将玩家对象加入
            userObj.ws = ws;
            let result = this.gameObject.playerJoinGame(userObj);
            if (result === '入座失败') {
                this.e.error('当前桌坐满了，请检查到底是谁多进来了');
            } else if (result === '坐满了') {
                this.gameObject.changeStage(MainStage.STAGE_READY);
                // 切换状态至分发手牌阶段
                this.gameObject.changeStage(MainStage.STAGE_DEAL);
            }
        }
    }

    // 广播
    broadcast(msg) {
        this.gameObject.talkAllDeskPlayer(msg);
    }

    // 收到了某个玩家打牌的消息
    Msg_DisCard(msg) {
        let username = msg.username;

    }
}
