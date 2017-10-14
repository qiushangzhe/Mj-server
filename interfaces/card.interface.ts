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

// 是否有 万 条 饼 风 箭 花 牌
export interface CardConfig {
    hasWan : boolean;
    hasTiao : boolean;
    hasBing : boolean;
    hasFeng : boolean;
    hasJian : boolean;
    hasHua : boolean;
}