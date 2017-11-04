import { PlayerInfoInterface } from '../../../common/interfaces/playerInfo.interface';
import { PlayerAi } from './../logic/player.logic';
import { MjCard } from './MjCard/mjCard';
import { Player } from './player';

export class SPlayer extends Player {
    ai : PlayerAi = null;
    constructor(info: PlayerInfoInterface){
        super(info);
        this.ai = new PlayerAi();
    }

    checkPeng(target: MjCard) {
        const result = this.ai.checkPengGang(this.handCards,target);
        if(result >= 2) return true;
        return null;
    }
    checkMingGang(target: MjCard) {
        const result = this.ai.checkPengGang(this.handCards,target);
        if(result == 3) return true;
        return null;
    }
    checkAnGang(target: MjCard) {
        return null;
    }
    checkBuGang(target: MjCard) {
        return null;
    }
    checkHu(target: MjCard) {
        return null;
    }
}