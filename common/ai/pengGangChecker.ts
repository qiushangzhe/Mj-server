import { MjGroup } from './../../server/game/model/MjCard/mjGroup';
import { DoorCard } from './../../server/game/model/MjCard/doorCard';
import { MjCard } from './../../server/game/model/MjCard/mjCard';
import { HandCard } from './../../server/game/model/MjCard/handCard';
import { Action } from '../../common/enums/action.enum';
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

export function checkMingGang(handCard:HandCard,target:MjCard){
    const pointer = checkPengGang(handCard,target);
    return pointer == 3;
}

export function checkAnGang(handCard:HandCard,target:MjCard){
    const pointer = checkPengGang(handCard,target);
    return pointer == 3;
}

export function checkBuGang(doorCard:DoorCard,target){
    const groupList:Array<MjGroup> = doorCard.getObj();
    for(let group of groupList){
        if(group.getGroupType() == Action.PENG){
            if(group.checkCanBuGang(target)){
                return true;
            }
        }
    }
    return false;
}


