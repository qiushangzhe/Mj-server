import { MjCard } from './mjCard';
import { CardListControl } from './cardListControl';
/*
    intro:玩家的弃牌池
*/ 
export class DiscardPool extends CardListControl {
    constructor(cardList:Array<MjCard>){
        super(cardList);
    }
}