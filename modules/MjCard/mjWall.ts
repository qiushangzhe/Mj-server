/*
    intro:牌墙的抽象对象
    by:qiusz
    createDate:2017-10-11
*/
import { MjCard } from './mjCard';
export class MjWall {
    // 牌墙
    private _wall:Array<MjCard> = null;
    constructor(wall:Array<MjCard>){
        this._wall = wall;
    }
}
