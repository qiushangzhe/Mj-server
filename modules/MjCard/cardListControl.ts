import { MjCard } from './mjCard';
/*
    对牌组进行控制
*/
export class CardListControl{
    private cardList:Array<MjCard> = null;
    constructor(list:Array<MjCard>){
        this.cardList = list;
    }
    // 增
    addCardToList(card:MjCard){
        this.cardList.push(card);
    }
    // 删
    deleteCardFromList(card:MjCard,time:Number=1){
        for(let i = 0;i<time;i++){
            let index = this.cardList.indexOf(card);
            this.cardList.splice(index,1);
        }
    }
    // 查询
    findCardFromList(card:MjCard){
        const index = this.cardList.indexOf(card);
        return index !== -1;
    }
}