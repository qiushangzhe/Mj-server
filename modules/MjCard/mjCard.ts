/*
    intro:麻将牌的抽象对象
    by:qiusz
    createDate:2017-10-11
*/
import { CardType,CardState } from '../../enums/card.enum';
import { CardInterface,CardStateInterface } from '../../interfaces/card.interface';

export class MjCard {
    // 麻将牌花色类型
    _type: CardType = null;
    // 麻将牌点数
    _point: Number = null;
    // 当前牌的状态
    _state:CardStateInterface = null;
    constructor(obj:CardInterface,state?:CardStateInterface){
        this._type = obj.type;
        this._point = obj.point;
        this._state = state || null;
    }

    getCardObj(){
        return {
            type : this._type,
            point : this._point
        }
    }

    getCard(){
        return JSON.stringify({
            type : this._type,
            point: this._point
        });
    }

    // 设置当前牌的详细信息 （状态信息）
    setCardStage(state:CardStateInterface){
        this._state = state;
    }

    getCardStage(){
        return this._state;
    }

    // 判断另一张牌和自己是不是一样的
    compareCard(otherCard:MjCard){
        console.log('------------比对开始-----------');
        console.log('当前牌type:',this._type,'point:',this._point);
        console.log('目标牌type:',otherCard._type,'point:',otherCard._point);
        console.log('type比较结果:',this._type == otherCard._type);
        console.log('point比较结果:',this._point == otherCard._point);
        console.log('比对结果',(this._type == otherCard._type && this._point == otherCard._point));
        console.log('------------比对结束-----------');
        return (this._type == otherCard._type && this._point == otherCard._point);
    }
}