import { Position } from '../../enums/player.enum';
import { CardState, CardType } from '../../enums/card.enum';
import { CardTranslate } from '../../debugTools/CardTranslate';
/*
    intro:牌墙的抽象对象
    by:qiusz
    createDate:2017-10-11
*/
import { MjCard } from './mjCard';
import { CardConfig, CardStateInterface } from '../../interfaces/card.interface';
export class MjWall {
    // 牌墙
    private _wall: Array<MjCard> = null;
    private _cardConfig: CardConfig = null;

    constructor(config: CardConfig) {
        this._wall = new Array();
        this._cardConfig = config;
    }

    // 初始化牌墙
    initWall() {
        if(this._cardConfig.hasWan){
            this.addWanCard();
        }
        if(this._cardConfig.hasTiao){
            this.addTiaoCard();
        }
        if(this._cardConfig.hasBing){
            this.addBingCard();
        }
        if(this._cardConfig.hasFeng){
            this.addFengCard();
        }
        if(this._cardConfig.hasJian){
            this.addJianCard();
        }
        if(this._cardConfig.hasHua){
            this.addHuaCard();
        }
        this.randomWall(5);
    }

    // 添加万牌 1万-9万 * 4
    addWanCard() {
        this.addCard(CardType.WAN, 9, 4);
    }

    // 添加条
    addTiaoCard() {
        this.addCard(CardType.TIAO, 9, 4);
    }

    // 添加饼 
    addBingCard() {
        this.addCard(CardType.BING, 9, 4);
    }

    // 添加风
    addFengCard(){
        this.addCard(CardType.FENG,4,4);
    }

    // 添加箭牌 （中发白*4）
    addJianCard() {
        this.addCard(CardType.JIAN,3,4);
    }

    // 添加花牌 (春夏秋冬，梅兰竹菊)
    addHuaCard() {
        this.addCard(CardType.HUA,8,1);
    }

    // 添加牌 1. 类型 2. 一共多少张 3.每种几张
    addCard(type, total, time) {
        for (let card = 1; card <= total; card++) {
            for (let i = 0; i < time; i++) {
                let mjcard = new MjCard({
                    type: type,
                    point: card
                },{
                    state : CardState.WALL,
                    from : Position.NONE  
                });
                this._wall.push(mjcard);
            }
        }
    }

    // 打乱牌墙
    randomWall(num){
        for(let i =0;i<num;i++){
            this._wall.sort(this.randomsort);
        }
    }

    randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }

    // 获取牌墙
    getCardWall(){
        return this._wall;
    }

    // 头抓牌
    headDrawCard(){
        return this._wall.shift();
    }

    // 尾抓牌
    tailDrawCard(){
        return this._wall.pop();
    }
}
// --------------  debug ------------
// const a = new MjWall({
//     hasWan : true,
//     hasTiao : true,
//     hasBing : true,
//     hasFeng : true,
//     hasJian : true,
//     hasHua : true
// });

// a.initWall();
// let b = a.getCardWall();
// b.map((data)=>{
//     console.log(CardTranslate.change(data));
// });
// console.log(a.getCardWall().length);
