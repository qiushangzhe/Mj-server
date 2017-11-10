import { Action } from '../../../../common/enums/action.enum';
import { MjGroup } from './mjGroup';
import { MjCard } from './mjCard';
import { CardListControl } from './cardListControl';

/*
    intro:玩家门牌的抽象对象 
    remark:门牌指的是吃碰杠后亮出的牌
*/ 
export class DoorCard {
    private _cardlist : Array<MjGroup> = null;
    constructor(cardlist:Array<MjGroup>){
        this._cardlist = cardlist;
    }
    
    // 增加一组 组牌
    addDoor(cards:MjGroup){
        this._cardlist.push(cards);
    }

    // 变碰组牌 为 补杠 组牌
    ChangeBuGang(card:MjCard){
        this._cardlist.map((group:MjGroup)=>{
            if(group.checkCanBuGang(card,Action.PENG) !== false){
                group.changeBuGang();
            }
        })
    }

    getObj(){
        return this._cardlist;
    }
}