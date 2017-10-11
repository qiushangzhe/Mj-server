import { MjCard } from './mjCard';
import { Action } from '../enums/action.enum';
// 一组牌 可能是碰 杠 吃 
export class MjGroup{
    // 一组牌都是什么
    private cardList :Array<MjCard> = null;
    // 这组牌的类型
    private groupType : Action = null;
    constructor(){
        
    }
    
    // 变碰为补杠
    changeBuGang(){
        this.cardList.push(this.cardList[0]);
        this.groupType = Action.GANG_BU;
    }

    judgeGang(card:MjCard,type:Action){
        if(this.groupType === type){
            if(this.cardList[0].getCard() === card.getCard()){
                return true;
            }
        }
        return false;
    }

    createPeng(card){
        this.createGroup(card,3);
        this.groupType = Action.PENG;
        return this;
    }

    createGang(card,type:Action){
        this.createGroup(card,4);
        this.groupType = type;
        return this;
    }
    
    createChi(cards:Array<MjCard>,type:Action){
        this.cardList = cards;
        this.groupType = type;
        return this;
    }
    createGroup(card:MjCard,number:Number){
        this.cardList = new Array();
        for(let i = 0;i<number;i++){
            this.cardList.push(card);
        }
    }
    
}