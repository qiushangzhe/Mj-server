import { logconfig } from '../../../common/tools/log.tool';
import { checkHu } from './../../../common/ai/huChecker';
import { dataList2AiList } from './../../../common/tools/translate';
import { HuResult } from './../../../common/interfaces/result.interface';
import { HandCard } from './../model/MjCard/handCard';
import * as log from 'log4js';
export class PlayerAi{
    logger;
    constructor(){
        this.logger = log.getLogger('playerLogic');
    }

    checkPengGang(handCard,target){
        let timer = 0;
        for(let card of handCard){
            if(card.compareCard(target)){
                timer ++ ;
            }
        }
        return timer;
    }   

    checkCanHu(handCard:HandCard,target):HuResult{
        let cards = handCard.getCardList().concat([]);
        cards.push(target);
        let ai_cards = dataList2AiList(cards);
        let result = checkHu(ai_cards);
        const data = {result:result}
        if(result){
            // 增加算番器还有胡牌信息
        }
        return data;
    }
}