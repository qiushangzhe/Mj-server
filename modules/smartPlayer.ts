import { PlayerNet } from '../net/PlayerNet';
import { checkPengGang } from './MjAi/common.check';
import { MjCard } from './MjCard/mjCard';
import { PlayerInfoInterface } from './../interfaces/playerInfo.interface';
import { Player } from './player';

export class SPlayer extends Player {
    network:PlayerNet;
    constructor(info: PlayerInfoInterface,ws:WebSocket){
        super(info);
        this.network = new PlayerNet(ws);
    }

    checkPeng(target: MjCard) {
        const result = checkPengGang(this.handCards,target);
        if(result >= 2) return true;
    }
    checkMingGang(target: MjCard) {
        const result = checkPengGang(this.handCards,target);
        if(result == 3) return true;
    }
    checkAnGang(target: MjCard) {
        return false;
    }
    checkBuGang(target: MjCard) {
        return false;
    }
    checkHu(target: MjCard) {
        return false;
    }
    
    
    
}