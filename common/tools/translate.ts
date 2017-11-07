import { MjCard } from './../../server/game/model/MjCard/mjCard';
import { CardType } from "../../common/enums/card.enum";
export const type_str = ['万','条','饼','','',''];
export const point_str = ['1','2','3','4','5','6','7','8','9'];
export const feng_str = ['东风','南风','西风','北风'];
export const other_str = ['红中','发财','白板'];
export const hua_str = ['春','夏','秋','冬','梅','兰','竹','菊'];
export function output(card:MjCard){
    if( card._type == CardType.WAN || 
        card._type == CardType.TIAO ||
        card._type == CardType.BING
    ){
        return `${point_str[card._point]}${type_str[card._type]}`;
    }else if(
        card._type == CardType.FENG
    ){
        return `${feng_str[card._point]}`;
    }else if(
        card._type == CardType.JIAN
    ){
        return `${other_str[card._point]}`;
    }else if(
        card._type == CardType.HUA
    ){
        return `${hua_str[card._point]}`;
    }else{
        return "不认识" + JSON.stringify(card);
    }
}

export function outputList (cardlist){
    let buffer = [];
    for(let card of cardlist){
        buffer.push(output(card));
    }
    return buffer;
}

export function data2Ai(card:MjCard){
    if(card._type == CardType.WAN){
        return card._point;
    }else if(card._type == CardType.TIAO){
        return card._point + 9;
    }else if(card._type == CardType.BING){
        return card._point + 18;
    }else if(card._type == CardType.FENG){
        return card._point + 28;
    }else if(card._type == CardType.JIAN){
        return card._point + 32;
    }else if(card._type == CardType.HUA){
        return card._point + 36;
    }else {
        console.log('出错',card);
    }
}
export function dataList2AiList(list){
    let buffer = [];
    for(let item of list){
        buffer.push(data2Ai(item));
    }
    return buffer;
}