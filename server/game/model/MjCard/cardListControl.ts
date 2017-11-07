import { HandCard } from './handCard';
import { MjCard } from './mjCard';
/*
    对牌组进行控制
*/
export class CardListControl{
    private cardList:Array<MjCard> = null;
    constructor(list:Array<MjCard>){
        this.cardList = list;
        this.sort();
    }
    // 增
    addCardToList(card:MjCard){
        this.cardList.push(card);
        this.sort();
    }
    // 删
    deleteCardFromList(card:MjCard,time:Number=1){
        let result = this.timesAction(time,()=>{
            for(let i = 0;i<time;i++){
                for(let index in this.cardList){
                    // console.log('当前牌墙的牌',this.cardList[index]);
                    if(this.cardList[index].compareCard(card)){
                        this.cardList.splice(Number(index),1)
                        this.sort();
                        return true;
                    }
                }
            }
            this.sort();
            return false;
        })
        // console.log('最后的结果是',result);
        this.sort();
        return result;
    }
    // 查询
    findCardFromList(card:MjCard){
        for(let index in this.cardList){
            if(this.cardList[index].compareCard(card)){
                this.sort();
                return this.cardList[index];
            }
        }
        this.sort();
        return null;
    }

    // 多次
    timesAction(time,action){
        for(var i =0;i<time;i++){
            if(!action()){
                return false;
            }
        }
        return true;
    }

    getCardList (){
        return this.cardList;
    }

    sort(){
        this.cardList.sort((a,b)=>{
            return a._index - b._index;
        });
    }

}