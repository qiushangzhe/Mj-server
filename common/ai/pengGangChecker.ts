import { MjCard } from './../../server/game/model/MjCard/mjCard';
import { HandCard } from './../../server/game/model/MjCard/handCard';

function checkPengGang(handCard:HandCard,target:MjCard){
    let timer = 0;
    for(let card of handCard.getCardList()){
        if(card.compareCard(target)){
            timer ++;
        }
    }
    return timer;
}

export function checkPeng(handCard:HandCard,target:MjCard){
    const pointer = checkPengGang(handCard,target);
    return pointer >= 2;
}

export function checkAnGang(handCard:HandCard,target:MjCard){
    const pointer = checkPengGang(handCard,target);
    return pointer == 3;
}


