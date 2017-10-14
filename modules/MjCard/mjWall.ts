/*
    intro:牌墙的抽象对象
    by:qiusz
    createDate:2017-10-11
*/
import { MjCard } from './mjCard';
import { CardConfig } from '../../interfaces/card.interface';
export class MjWall {
    // 牌墙
    private _wall:Array<MjCard> = null;
    private _cardConfig:CardConfig = null;

    constructor(config:CardConfig){
        this._cardConfig = config;
    }

    // 初始化牌墙
    initWall(){
        
    }

    // 添加万牌
    addWanCard(){
        
    }
}
