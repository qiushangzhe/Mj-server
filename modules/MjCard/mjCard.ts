/*
    intro:麻将牌的抽象对象
    by:qiusz
    createDate:2017-10-11
*/
import { CardType,CardState } from '../../enums/card.enum';
import { CardInterface,CardStateInterface } from '../../interfaces/card.interface';

export class MjCard {
    // 麻将牌花色类型
    private _type: CardType = null;
    // 麻将牌点数
    private _point: Number = null;
    // 当前牌的状态
    private _state:CardStateInterface = null;
    constructor(obj:CardInterface,state:CardStateInterface){
        this._type = obj.type;
        this._point = obj.point;
        this._state = state;
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
}