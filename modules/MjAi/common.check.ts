import { MjCard } from './../MjCard/mjCard';
import { HandCard } from '../MjCard/handCard';
export function checkPengGang(handCard:HandCard,target:MjCard){
    const cardList:Array<MjCard> = handCard.getCardList();
    let result = 0;
    for(let i in cardList){
        if(cardList[i]._point == target._point && cardList[i]._type == target._type){
            result ++;
        }
    }
    return result;
}
