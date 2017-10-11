// 组成一个麻将牌的基本数据 接口
import { CardType,CardState } from '../enums/card.enum';
import { Position } from '../enums/player.enum';
export interface CardInterface {
    type : CardType;
    point : Number;
}

export interface CardStateInterface{
    state : CardState;
    from : Position ;
}