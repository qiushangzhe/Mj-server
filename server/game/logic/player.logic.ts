import { MjCard } from './../model/MjCard/mjCard';
import { DoorCard } from './../model/MjCard/doorCard';
import { logconfig } from '../../../common/tools/log.tool';
import { HuChecker } from './../../../common/ai/huChecker';
import { dataList2AiList } from './../../../common/tools/translate';
import { HuResult } from './../../../common/interfaces/result.interface';
import { HandCard } from './../model/MjCard/handCard';
import * as log from 'log4js';
import * as PGchecker from './../../../common/ai/pengGangChecker';
export class PlayerAi{
    logger;
    constructor(){
        this.logger = log.getLogger('playerLogic');
    }

    checkCanPeng(handCard,target){
        return PGchecker.checkPeng(handCard,target);
    }

    checkCanMingGang(handCard,target){
        return PGchecker.checkMingGang(handCard,target);
    }

    checkCanAnGang(handCard,target){
        return PGchecker.checkAnGang(handCard,target);
    }

    checkCanBuGang(dorcard:DoorCard,target:MjCard){
        return PGchecker.checkBuGang(dorcard,target);
    }



    checkCanHu(handCard:HandCard,target):HuResult{
        let cards = handCard.getCardList().concat([]);
        cards.push(target);
        let ai_cards = dataList2AiList(cards);
        let result = HuChecker(ai_cards);
        const data = {result:result}
        if(result){
            // 增加算番器还有胡牌信息
        }
        return data;
    }
}