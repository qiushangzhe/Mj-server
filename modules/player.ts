import { MjGroup } from './MjCard/mjGroup';
import { MjCard } from './MjCard/mjCard';
import { DoorCard } from './MjCard/doorCard';
import { HandCard } from '../modules/MjCard/handCard';
import { PlayerInfoInterface } from '../interfaces/playerInfo.interface';
import { DiscardPool } from './MjCard/discardPool';
import { CardState } from '../enums/card.enum';
import { Action } from '../enums/action.enum';
/*
    麻将玩家的抽象对象
*/
export class Player {
    // 玩家的手牌
    handCards: HandCard = null;
    // 玩家的门牌
    doorCard: DoorCard = null;
    // 玩家的弃牌
    discardPool: DiscardPool = null;
    // 玩家的一些基本信息
    baseData: PlayerInfoInterface = null;
    // 玩家的ws对象
    ws = null;
    // 构造函数
    constructor(info: PlayerInfoInterface) {
        this.baseData = info;
    }
    // ------------初始化------------
    // a.初始化手牌
    initHandCards(cardList: Array<MjCard>) {
        this.handCards = new HandCard(cardList);
    }

    // b.初始化开门牌
    initDoorCard(cardList: Array<MjGroup>) {
        this.doorCard = new DoorCard(cardList);
    }

    // c.初始化弃牌池
    initDiscardPool(cardList: Array<MjCard>) {
        this.discardPool = new DiscardPool(cardList);
    }

    // ------------主动变换操作------------
    // a.吃牌 
    Action_Chi(cards: Array<MjCard>) {
        cards.map((card: MjCard) => {
            if (card.getCardStage().state === CardState.DROW) {
                this.handCards.deleteCardFromList(card);
            }
        })
        this.doorCard.addDoor(new MjGroup().createChi(cards, Action.CHI));
    }

    // b.碰牌
    Action_Peng(card: MjCard) {
        this.handCards.deleteCardFromList(card, 2);
        this.doorCard.addDoor(new MjGroup().createPeng(card));
    }

    // c.明杠 
    Action_GangMing(card: MjCard) {
        this.handCards.deleteCardFromList(card, 3);
        this.doorCard.addDoor(new MjGroup().createGang(card, Action.GANG_MING));
    }

    // d.暗杠
    Action_GangAn(card: MjCard) {
        this.handCards.deleteCardFromList(card, 3);
        this.doorCard.addDoor(new MjGroup().createGang(card, Action.GANG_AN));
    }

    // e.补杠
    Action_GangBu(card: MjCard) {
        this.handCards.deleteCardFromList(card);
        this.doorCard.ChangeBuGang(card);
    }

    // --------------被动变换操作-------------
    // a.被吃牌
    BeAction_Chi(card:MjCard){
        this.discardPool.deleteCardFromList(card);
    }
    // b.被碰牌
    BeAction_Peng(card:MjCard){
        this.discardPool.deleteCardFromList(card);
    }
    // c.被杠牌
    BeAction_Gang(card:MjCard){
        this.discardPool.deleteCardFromList(card);
    }
}