import { MjCard } from '../../game/model/MjCard/mjCard';
import { SPlayer } from './smartPlayer';
import { PlayerInfoInterface } from '../../../common/interfaces/playerInfo.interface';
import * as log from 'log4js';
import { MjDesk } from './MjDesk';
import { Action } from '../../../common/enums/action.enum';
export class GameModel{
    desk:MjDesk = null;
    logger;
    constructor(){
        this.desk = new MjDesk();
        this.initGamemodel();
        this.logger = log.getLogger('game_model');
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
        // this.desk.initPlayerHandCard();
        this.desk.debug();
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

    // 通过id获取玩家对象
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

    // 通过pos获取玩家
    getPlayerByPos(pos){
        return this.desk.getPlayerByPos(pos);
    }

    // 玩家碰
    playerPeng(id,card:MjCard){
        const player = this.getPlayerById(id);
        if(player === null) this.logger.error(`输入的${id}，没有找到这个玩家`);
        player.Action_Peng(card);
        const Be_player = this.getPlayerByPos(card._state.from);
        Be_player.BeAction_Peng(card);
    }

    // 玩家杠
    playerGang(id,card:MjCard,gangType){
        const player = this.getPlayerById(id);
        const Be_player = this.getPlayerByPos(card._state.from);
        if(player === null) this.logger.error(`输入的${id}，没有找到这个玩家`);
        if(gangType == Action.GANG_MING){
            player.Action_GangMing(card);
            Be_player.BeAction_Gang(card);
        }else if(gangType == Action.GANG_AN){
            player.Action_GangAn(card);
        }else if(gangType == Action.GANG_BU){
            player.Action_GangBu(card);
        }
    }
}