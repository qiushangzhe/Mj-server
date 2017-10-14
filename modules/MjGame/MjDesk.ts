import { MainLogic } from './mainLogic';
import { MjWall } from './../MjCard/mjWall';
import { Player } from './../player';
import { Position } from '../../enums/position.enum';
/*
    麻将桌的抽象对象
*/

interface Seat {
    player: Player;
    position: Position;
}

export class MjDesk {
    // 庄家位置
    public zhuangPosition:Position = null;
    // 座位
    private seats: Array<Seat> = [];
    // 牌
    private cardWall: MjWall = null;

    constructor() {

    }

    initDesk() {
        this.initCardWall();
        this.initSeats();
    }

    // 初始化牌墙
    initCardWall(){
        this.cardWall = new MjWall({
            hasWan : true,
            hasTiao : false,
            hasBing : false,
            hasFeng : true,
            hasJian : true,
            hasHua : false
        });
        this.cardWall.initWall(3);
    }

    // 初始化椅子
    initSeats(){
        this.seats.length = 0;
        this.seats.push({ player: null, position: Position.DONG });
        this.seats.push({ player: null, position: Position.NAN });
        this.seats.push({ player: null, position: Position.XI });
        this.seats.push({ player: null, position: Position.BEI });
    }

    playerSit(){
        
    }

    
}