import { MjCard } from '../../game/model/MjCard/mjCard';
import { SPlayer } from './smartPlayer';
import { PlayerInfoInterface } from '../../../common/interfaces/playerInfo.interface';

import { MjDesk } from './MjDesk';
export class GameModel{
    desk:MjDesk = null;

    constructor(){
        this.desk = new MjDesk();
        this.initGamemodel();
    }

    initGamemodel(){
        this.desk.initCardWall();
    }

    // 添加玩家
    addPlayer(player:PlayerInfoInterface){
        this.desk.playerSit(new SPlayer(player));
    }

    // 发牌
    dealCard(){
        this.desk.initPlayerHandCard();
    }

    // 玩家打牌
    playerDisCard(id,card:MjCard){
        const player = this.getPlayerById(id);
        player.Action_DisCard(card);
    }

    // 玩家抓拍
    playerDrawCard(player:SPlayer){
        const card = this.desk.cardWall.headDrawCard();
        player.Action_DrawCard(card);
        return card;
    }

    getPlayerById(id){
        return this.desk.getPlayerInfo(id);
    }

    // 获取庄家id
    getZhuangId(){
        return this.desk.getZhuangPlayer().getPlayerId();
    }

    // 获取断线重连数据
    getReconnectData(id){
        let data = [];
        const seats = this.desk.getSeats();
        for(let seat of seats){
            if(seat.player.getPlayerId() === id){
                data.push({
                    position : seat.position,
                    handcard : seat.player.getHandCardObj(),
                    doorcard : seat.player.getDoorCardObj(),
                    discard : seat.player.getDiscardPool()
                })
            }else {
                data.push({
                    position : seat.position,
                    handcard : null,
                    doorcard : seat.player.getDoorCardObj(),
                    discard : seat.player.getDiscardPool()
                })
            }
        }
        return data;
    }


    getPlayerByPos(pos){
        return this.desk.getPlayerByPos(pos);
    }
}