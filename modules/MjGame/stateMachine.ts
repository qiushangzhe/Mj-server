import { MainStage } from '../../enums/stage.enum';

let stateChnChar = [
    '掷骰子阶段',
    '发牌阶段',
    '处理手牌阶段',
    '游戏开始',
    '打牌',
    '打牌后处理',
    '抓牌',
    '抓牌后处理',
    '游戏结算'
];

export class StateMachine {
    nowStage: MainStage = null;
    constructor() {
        this.nowStage = null;
    }

    initStateMachine() {
        this.nowStage = MainStage.STAGE_READY;
    }

    // - 掷骰子阶段
    changeToCrap(){
        this.nowStage = MainStage.STAGE_CRAP;
    }

    // - 发牌阶段
    changeToDeal(){
        this.nowStage = MainStage.STAGE_DEAL;
    }

    // - 处理手牌阶段
    changeToHandleHandcard(){
        this.nowStage = MainStage.STAGE_HANDLE_HANDCARD;
    }

    // - 游戏开始
    changeToStartGame(){
        this.nowStage = MainStage.STAGE_GAME_START;
    }

    // 打牌
    changeToDisCard(){
        this.nowStage = MainStage.STAGE_DISCARD;
    }

    // 打牌后处理
    changeToAfterDisCard(){
        this.nowStage = MainStage.STAGE_AFTER_DISCARD;
    }

    // 抓牌
    changeToDrawCard(){
        this.nowStage = MainStage.STAGE_DRAWCARD;
    }

    // 抓牌后处理
    changeToAfterDrawCard(){
        this.nowStage = MainStage.STAGE_AFTER_DRAWCARD;
    }

    // 游戏结算
    changeToFinal(){
        this.nowStage = MainStage.STAGE_FINAL_BALANCE;
    }

    getNowStage(){
        return this.nowStage;
    }
}