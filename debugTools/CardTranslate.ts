import { CardType } from '../enums/card.enum';
import { MjCard } from '../modules/MjCard/mjCard';
let chnNumChar = ['','一','二','三','四','五','六','七','八','九'];
let chnFengChar = ['','东','南','西','北'];
let chnJianChar = ['','红中','发财','白板'];
let chnHuaChar = ['','春','夏','秋','冬','梅','兰','竹','菊'];
let chnTypeChar = ['','万','条','饼','风','',''];
export class CardTranslate {

    constructor(){

    }

    public static change(card:MjCard) {
        const cardObj = card.getCardObj();
        let type = chnTypeChar[cardObj.type];
        let point = this.pointTranslate(cardObj);
        return point+type;
    }

    public static pointTranslate(obj:{type;point}){
        if(obj.type === CardType.WAN || obj.type === CardType.TIAO || obj.type === CardType.BING){
            return chnNumChar[obj.point];       
        }else if(obj.type === CardType.FENG){
            return chnFengChar[obj.point];
        }else if(obj.type === CardType.JIAN){
            return chnJianChar[obj.point];
        }else if(obj.type === CardType.HUA){
            return chnHuaChar[obj.point];
        }
    }
}