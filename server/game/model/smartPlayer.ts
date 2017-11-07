import { checkPeng } from './../../../common/ai/pengGangChecker';
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
        const peng_result = checkPeng(this.handCards,target);
        let param:PengResult = {result:false};
        param.result = peng_result;
        return param;
    }
    checkMingGang(target: MjCard):GangResult {
        let param:GangResult= {result:false};
        return param;
    }
    checkAnGang(target: MjCard) {
        let param:GangResult= {result:false};
        return param;
    }
    checkBuGang(target: MjCard) {
        let param:GangResult= {result:false};
        return param;
    }
    checkHu(target: MjCard):HuResult {
        const result = this.ai.checkCanHu(this.handCards,target);
        return result;
    }
}