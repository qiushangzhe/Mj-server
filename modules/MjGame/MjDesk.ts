import { SPlayer } from '../smartPlayer';
import { MainLogic } from './mainLogic';
import { MjWall } from './../MjCard/mjWall';
import { Position } from '../../enums/position.enum';
/*
    麻将桌的抽象对象
*/

interface Seat {
    player: SPlayer;
    position: Position;
}

export class MjDesk {
    // special
    specialCards ;
    // 庄家位置
    public zhuangPosition:Position = Position.DONG;
    // 座位
    private seats: Array<Seat> = [];
    // 牌
    public cardWall: MjWall = null;

    constructor() {
        this.initSeats();
    }

    // 初始化牌墙
    initCardWall(){
        this.cardWall = new MjWall({
            hasWan : true,
            hasTiao : true,
            hasBing : true,
            hasFeng : true,
            hasJian : true,
            hasHua : false
        });
        this.cardWall.initWall(5);
    }

    // 初始化椅子
    initSeats(){
        this.seats.length = 0;
        this.seats.push({ player: null, position: Position.DONG });
        this.seats.push({ player: null, position: Position.NAN });
        this.seats.push({ player: null, position: Position.XI });
        this.seats.push({ player: null, position: Position.BEI });
    }

    // 新的一局开始 初始化
    initNewTurn(){
        for(let index in this.seats){
            this.seats[index].player.initPlayer();
        }
        this.changeSit();
    }

    // 轮换座位
    changeSit(){
        let buffer = this.seats[3].position;
        this.seats[3].position = this.seats[2].position;
        this.seats[2].position = this.seats[1].position;
        this.seats[1].position = this.seats[0].position;
        this.seats[0].position = buffer;
    }

    // 玩家坐在椅子上
    playerSit(player:SPlayer){
        for(let index in this.seats){
            if(this.seats[index].player === null){
                this.seats[index].player = player;
                player.baseData.position = this.seats[index].position;
                return true;
            }
        }
        return false;
    }

    // 是否所有的玩家都坐在了椅子上
    isAllPlayerEnter(){
        for(let index in this.seats){
            if(this.seats[index].player === null){
                return false;
            }
        }
        return true;
    }

    // 获取所有的椅子
    getSeats(){
        return this.seats;
    }

    // 给所有玩家发牌
    initPlayerHandCard(){
        for(let index in this.seats){
            let cardList = null;
            if(this.seats[index].position === this.zhuangPosition){
                cardList  = this.cardWall.drawCardFromWall(14);
            }else{
                cardList = this.cardWall.drawCardFromWall(13);
            }
            this.seats[index].player.initHandCards(cardList);
            this.seats[index].player.network.sendData({
                type : 'INITHANDCARD',
                data : cardList
            });
        }
    }
}