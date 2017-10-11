import { MjCard } from './mjCard';
import { CardListControl } from './cardListControl';
/*
    intro: 玩家手牌的抽象对象
*/ 
export class HandCard extends CardListControl{
    constructor(cardlist:Array<MjCard>){
        super(cardlist);
    }

    // 抓牌操作
    ACTION_DrowCard(card:MjCard){
        this.addCardToList(card);
    }

    // 打牌操作
    ACTION_DisCard(card:MjCard){
        this.deleteCardFromList(card);
    }

    // 碰牌
    ACTION_PengCard(card:MjCard){
        this.deleteCardFromList(card,3);
    }

    // 明杠或暗杠
    ACTION_GangCard_MingOrAn(card:MjCard){
        this.deleteCardFromList(card,4);
    }

    // 补杠
    ACTION_GangCard_Bu(card:MjCard){
        this.deleteCardFromList(card);
    }

}