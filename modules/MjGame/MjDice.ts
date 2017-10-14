/*
    麻将中的骰子
*/ 

export class Dice {
    private _point:number = null;
    private _minPoint:number = 1;
    private _maxPoint:number = 6;

    // 支持自定义骰子的面数
    constructor(minPoint?:number,maxPoint?:number){
        if(minPoint !== undefined){
            this._minPoint = minPoint
        }
        if(maxPoint !== undefined){
            this._maxPoint = maxPoint;
        }
    }

    // 获取投掷一次骰子的结果
    getPoint(){
        return Math.floor(Math.random()*(this._maxPoint - this._minPoint + 1)) + this._minPoint;
    }
}