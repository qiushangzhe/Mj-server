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
    private seats: Array<Seat> = null;
    constructor() {

    }

    initDesk() {
        this.seats.length = 0;
        this.seats.push({ player: null, position: Position.DONG });
        this.seats.push({ player: null, position: Position.NAN });
        this.seats.push({ player: null, position: Position.XI });
        this.seats.push({ player: null, position: Position.BEI });
    }

    
}