import { MessageTypeReq, MessageTypeAck } from '../../../common/enums/message.enum';
import * as ws from 'ws';

export interface SocketPlayer{
    socket : WebSocket;
    userid : number;
}
export class SocketPlayerManage {
    userlist:Array<SocketPlayer> = null;
    constructor(){
        this.userlist = new Array();
    }

    initPlayer(_userid,_socket){
        for(let player of this.userlist){
            if(player.userid === _userid){
                if(player.socket == null){
                    player.socket = _socket;
                }else{
                    console.log('当前已经存在用户'+player.userid);
                    return;
                }
            }
        }
        this.userlist.push({
            socket : _socket,
            userid : _userid
        });
    }

    sendMessage(id,msg){
        const player:SocketPlayer = this.findUserById(id);
        if(player){
            player.socket.send(JSON.stringify(msg));
        }else{
            console.log(`没有找到玩家${id}`);
        }
       
    }

    broadcast(msg){
        for(let player of this.userlist){
            player.socket.send(JSON.stringify(msg));
        }
    }

    broadcastExcept(id,msg){
        for(let player of this.userlist){
            if(player.userid === id){
                continue;
            }
            player.socket.send(JSON.stringify(msg));
        }
    }

    findUserById(id){
        return this.userlist.find((player)=>{
            if(player.userid == id){
                return true;
            }
            return false;
        })
    }

    playerLeaveGame(socket){
        for(let player of this.userlist){
            if(player.socket == socket){
                player.socket = null;
                return player.userid;
            }
        }
    }

    // 玩家进入游戏成功
    loginSuccess(id){
        this.sendMessage(id,{
            type : MessageTypeAck.ACK_LOGIN
        });
    }

    // 告知当前手牌信息
    sendHandCard(id,cardinfo){
        this.sendMessage(id,{
            type : MessageTypeAck.ACK_DEALCARD,
            data : cardinfo
        })
    }

    // 请求打牌
    sendPlaseDisCard(id){
        this.sendMessage(id,{
            type : MessageTypeAck.ACK_DISCARD
        })
    }

    // 某玩家抓了一张牌
    sendPlayerDrawCard(id,card){
        for(let player of this.userlist){
            if(player.userid == id){
                this.sendMessage(player.userid,{
                    type:MessageTypeAck.ACK_DRAWCARD,
                    data : {
                        card : card
                    }
                });
            }else{
                this.sendMessage(player.userid,{
                    type:MessageTypeAck.ACK_DRAWCARD
                });
            }
        }
    }

    // 广播某玩家打牌
    broadcastPlayerDisCard(player,card){
        this.broadcast({
            type : MessageTypeAck.ACK_DISCARD,
            data : {
                who : player,
                card : card
            }
        })
    }

    // 玩家断线重连了
    reconnect(id,data){
        this.sendMessage(id,{
            type : MessageTypeAck.ACK_RECONNECT,
            data : data
        })
    }

    // 告知当前可以做的事情
    ackPlayerNextAction(id,action){
        this.sendMessage(id,{
            type : MessageTypeAck.ACK_DOACTION,
            data : action 
        });
    }
}