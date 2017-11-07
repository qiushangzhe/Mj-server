import { QLOG,logconfig } from './../tools/log.tool';
import * as log from 'log4js';
const debug_log = log.getLogger('checkHu');
const log_level = 'error';// 如果是debug 就输出。

// -----------普通能组成顺子的牌--------------
// 检查一坎
function checkOneKan(cardList, begin, end) {
    for (let index = begin; index <= end; index++) {
        if (cardList[index] == 1) {
            if (cardList[index + 1] >= 1 && cardList[index + 2] >= 1) {
                cardList[index]--;
                cardList[index + 1]--;
                cardList[index + 2]--;
                checkOneKan(cardList, begin, end);
            }
        }
    }
    return cardList
}
// 检查两坎
function checkTwoKan(cardList, begin, end) {
    for (let index = begin; index <= end; index++) {
        if (cardList[index] == 2) {
            if (cardList[index + 1] >= 2 && cardList[index + 2] >= 2) {
                cardList[index] -= 2;
                cardList[index + 1] -= 2;
                cardList[index + 2] -= 2;
                checkTwoKan(cardList, begin, end);
            }
        }
    }
    return cardList
}

// 检查三坎
function checkThreeKan(cardList, begin, end) {
    for (let index = begin; index <= end; index++) {
        if (cardList[index] == 3) {
            cardList[index] -= 3;
            checkThreeKan(cardList, begin, end);
        }
    }
    return cardList
}

// 检查四坎
function checkFourKan(cardList, begin, end) {
    for (let index = begin; index <= end; index++) {
        if (cardList[index] == 4) {
            if(cardList[index + 1] >=1 && cardList[index + 2] >=1){
                cardList[index] -=4;
                cardList[index + 1] --;
                cardList[index + 2] --;
                checkFourKan(cardList, begin, end);
            }
        }
    }
    return cardList
}

function doCheck(cardlist){
    let buffer = [].concat(cardlist);
    // console.log('------------------刚开始输入的-------------');
    // console.log(buffer);
    // console.log('-----------------------------------------');
    // 万 0-8
    // 条 9 - 17
    // 筒 18 - 26
    // 风 27 - 30
    // 箭 31 - 34
    for(let i = 0;i<3;i++){
        // console.log(`开始检测${i==0?'万':i==1?'条':'饼'}`);
        buffer = checkOneKan(buffer,i*9,i*9+8-2);
        // console.log('1坎检测:',buffer);
        buffer = checkTwoKan(buffer,i*9,i*9+8-2);
        // console.log('2坎检测:',buffer);
        buffer = checkThreeKan(buffer,i*9,i*9+8-2);
        // console.log('3坎检测:',buffer);
        buffer = checkFourKan(buffer,i*9,i*9+8-2);
        // console.log('4坎检测:',buffer);
    }

    buffer = checkThreeKan(buffer,27,34);
    debug_log.debug('-------------------result--------------');
    debug_log.debug(JSON.stringify(buffer));
    debug_log.debug('-------------------result end--------------');
    for(let card of buffer){
        if(card != 0 && card != undefined && card != null){
            // console.log(card);
            return false;
        }
    }
    return true;
}

// [ 1, 1, 1, , 1, 1, 1, , , , , , , , , , , 2, , , , , , 1, 1, 1, , , , , , , 3 ]
/**
 * 检查是否可以胡牌
 * @param cardlist 当前手牌信息，必须是3n+2张牌。然后是数组类型的
 */ 
export function checkHu(cardlist){
    debug_log.level = log_level;
    debug_log.debug(`当前输入牌为${JSON.stringify(cardlist)}`);
    // console.log(cardlist);
    // 选将
    for(let index in cardlist){
        if(cardlist[index] == 2){
            cardlist[index]-=2;
            if(doCheck(cardlist)){
                return true;
            }else{
                cardlist[index]+=2;
            }
        }
    }
    return false;
}