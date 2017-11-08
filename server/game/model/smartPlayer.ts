import { HuResult, PengResult, GangResult } from './../../../common/interfaces/result.interface';
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

    checkPeng(target: MjCard):PengResult {
        const peng_result = this.ai.checkCanPeng(this.handCards,target);
        let param:PengResult = {result:false};
        param.result = peng_result;
        return param;
    }

    checkMingGang(target: MjCard):GangResult {
        let param:GangResult= {result:false};
        const gang_result = this.ai.checkCanMingGang(this.handCards,target);
        param.result = gang_result;
        return param;
    }

    checkAnGang(target: MjCard) {
        let param:GangResult= {result:false};
        const gang_result = this.ai.checkCanAnGang(this.handCards,target);
        param.result = gang_result;
        return param;
    }

    checkBuGang(target: MjCard) {
        let param:GangResult= {result:false};
        const gang_result = this.ai.checkCanBuGang(this.doorCard,target);
        param.result = gang_result;
        return param;
    }

    checkHu(target: MjCard):HuResult {
        const result = this.ai.checkCanHu(this.handCards,target);
        return result;
    }
}