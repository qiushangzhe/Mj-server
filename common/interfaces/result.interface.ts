import { SPlayer } from '../../server/game/model/smartPlayer'
import { MjCard } from '../../server/game/model/MjCard/mjCard';
export enum GangType {
    GANG_BU = 0,
    GANG_MING,
    GANG_AN
}
export interface PengResult{
    // 碰哪张牌
    card?: MjCard;
    // 碰谁的牌
    targetPlayer?: SPlayer;
    // 是否可以碰
    result : boolean;
}

export interface GangResult{
    result : boolean;
    // 杠哪张牌
    card : MjCard;
    // 杠谁的牌
    targetPlayer:SPlayer;
    // 杠的类型 
    type : GangType;
}

export interface HuResult{
    // 胡那张牌
    card?: MjCard;
    // 谁的牌
    targetPlayer?:SPlayer;
    // 是不是自摸
    isZiMo?: boolean;
    // 胡的番种
    huType?: Array<string>;
    // 胡多少分
    huScore?: number;
    // 是否可以胡牌
    result : boolean;
}