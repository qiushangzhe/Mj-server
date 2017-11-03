import { SPlayer } from './../../modules/smartPlayer';
import { MjCard } from './../../modules/MjCard/mjCard';
import { MessageTypeAck, MessageTypeError } from '../../enums/message.enum';
import { MainStage } from '../../enums/stage.enum';
import * as ws from 'ws';
import * as log from 'log4js';
import { MjGame } from '../../modules/MjGame/MjGame';
import { Player } from '../../modules/player';
import { CardType , CardState} from '../../enums/card.enum'
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
                this.g.info(msg);
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
                        this.Msg_DisCard(ws, msg);
                }
            });
            ws.on('close', () => {
                if (ws.player) {
                    this.g.trace(`玩家${ws.player.baseData.name}离开了游戏`);
                    ws.player.network.clearWs();
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
            this.gameObject.reconnect(ws, username);
        } else {
            let findPlayerObj = this.gameObject.findPlayerByName(msg.data.username);
            if (findPlayerObj === null) {
                //1. 创建玩家对象
                let userObj = new SPlayer({
                    name: username
                },ws);

                ws.player = userObj;

                //2. 将玩家对象加入
                userObj.network.addWs(ws);
                let result = this.gameObject.playerJoinGame(userObj);
                if (result === '入座失败') {
                    this.e.error('当前桌坐满了，请检查到底是谁多进来了');
                } else if (result === '坐满了') {
                    // 切换到游戏准备开始阶段
                    this.gameObject.changeToReadyGame();
                    // 切换状态至分发手牌阶段
                    this.gameObject.changeToDeal();
                }
            } else {
                // 发送错误消息
                findPlayerObj.network.sendData({
                    type: MessageTypeError.ERROR_KICKING,
                    message: '当前有人登陆你的账号，把你踢掉了'
                });
                // 断开连接
                findPlayerObj.network.forgotPlayer();
                findPlayerObj.network.closeWs();
                // 接管新的ws连接
                findPlayerObj.network.addWs(ws);
                ws.player = findPlayerObj;
            }
        }
    }

    // 广播
    broadcast(msg) {
        this.gameObject.talkAllDeskPlayer(msg);
    }

    // 收到了某个玩家打牌的消息
    Msg_DisCard(ws, msg) {
        console.log(ws.player);
        this.g.trace(`收到玩家${ws.player.baseData.name}的打牌消息${JSON.stringify(msg)}`);
        let result = this.gameObject.ackPlayerDisCard(ws,msg);
        if(result === 'playerNone'){
            this.e.error(`当前ws发送的数据是${JSON.stringify(msg)}有问题。导致通过ws反查用户时找不到用户数据`);
        }else if(result === 'notYourTurn'){
            ws.send(JSON.stringify({
                type: MessageTypeError.ERROR_POSITION,
                message: '当前没有轮到你打牌'
            }));
        }else if(result === 'cardNone'){
            this.e.error(`当前ws发送的数据是${JSON.stringify(msg)}有问题。导致打牌操作出现了错误`);
        }
    }
}
