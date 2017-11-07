import { PlayerInfoInterface } from '../../../common/interfaces/playerInfo.interface';
import { MjCard } from './MjCard/mjCard';
import { HandCard } from './MjCard/handCard';
import { MjGroup } from './MjCard/mjGroup';
import { DoorCard } from './MjCard/doorCard';
import { DiscardPool } from './MjCard/discardPool';
import { CardState } from '../../../common/enums/card.enum';
import { Action } from '../../../common/enums/action.enum';
import { outputList } from '../../../common/tools/translate';
import * as log from 'log4js';
/*
    麻将玩家的抽象对象
*/
export abstract class Player {
    // 玩家的手牌
    handCards: HandCard = null;
    // 玩家的门牌
    doorCard: DoorCard = null;
    // 玩家的弃牌
    discardPool: DiscardPool = null;
    // 玩家的一些基本信息
    baseData: PlayerInfoInterface = null;
    logger ;
    // 构造函数
    constructor(info: PlayerInfoInterface) {
        this.baseData = info;
        this.doorCard = new DoorCard([]);
        this.discardPool = new DiscardPool([]);
        this.logger = log.getLogger('player_data');
    }

    getBaseData(){
        return this.baseData;
    }

    getPlayerId(){
        return this.baseData.userid;
    }

    getHandCardObj(){
        return this.handCards.getCardList();
    }

    getDiscardPool(){
        return this.discardPool.getCardList();
    }

    getDoorCardObj(){
        return this.doorCard.getObj();
    }
    // ------------初始化------------
    
    // 0.初始化玩家
    initPlayer(){
        this.initHandCards([]);
        this.initDoorCard([]);
        this.initDiscardPool([]);
    }

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
        this.logger.info(`玩家${this.baseData.userid}手牌${outputList(this.handCards.getCardList())}`);
    }

    // c.明杠 
    Action_GangMing(card: MjCard) {
        this.handCards.deleteCardFromList(card, 3);
        this.doorCard.addDoor(new MjGroup().createGang(card, Action.GANG_MING));
        this.logger.info(`玩家${this.baseData.userid}手牌${outputList(this.handCards.getCardList())}`);
    }

    // d.暗杠
    Action_GangAn(card: MjCard) {
        this.handCards.deleteCardFromList(card, 3);
        this.doorCard.addDoor(new MjGroup().createGang(card, Action.GANG_AN));
        this.logger.info(`玩家${this.baseData.userid}手牌${outputList(this.handCards.getCardList())}`);
    }

    // e.补杠
    Action_GangBu(card: MjCard) {
        this.handCards.deleteCardFromList(card);
        this.doorCard.ChangeBuGang(card);
        this.logger.info(`玩家${this.baseData.userid}手牌${outputList(this.handCards.getCardList())}`);
    }

    // f. 打牌
    Action_DisCard(card: MjCard){
        const buffer = this.handCards.deleteCardFromList(card);
        this.logger.info(`玩家${this.baseData.userid}手牌${outputList(this.handCards.getCardList())}`);
        return buffer;
    }

    // 抓
    Action_DrawCard(card:MjCard){
        this.handCards.addCardToList(card);
        this.logger.info(`玩家${this.baseData.userid}手牌${outputList(this.handCards.getCardList())}`);
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

    /**
     * 检查是否能碰
     */ 
    abstract checkPeng(target:MjCard);

    /**
     * 检查是否能明杠
     */ 

    abstract checkMingGang(target:MjCard);

    /**
     * 检查是否能暗杠
     */ 

     abstract checkAnGang(target:MjCard);

    /**
     * 检查是否可以补杠
     */  

    abstract checkBuGang(target:MjCard);

    /**
     * 检查是否胡牌
     */ 

    abstract checkHu(target:MjCard);
}