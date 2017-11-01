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

export abstract class StateMachine {
    nowStage: MainStage = MainStage.STAGE_READY;;
    constructor() {
        
        
    }

    changeToReadyGame() {
        // this.nowStage = MainStage.STAGE_READY;
        this.StateReadyCallBack();
    }

    /**
     *  - 切换到掷骰子阶段
     */
    changeToCrap(){
        this.nowStage = MainStage.STAGE_CRAP;
        this.StateCrapCallBack();
    }

    /**
     *  - 切换到发牌阶段
     */
    changeToDeal(){
        this.nowStage = MainStage.STAGE_DEAL;
        this.StateDealCallBack();
    }

    /**
     *  - 切换到处理手牌阶段
     */
    changeToHandleHandcard(){
        this.nowStage = MainStage.STAGE_HANDLE_HANDCARD;
        this.StateHandleCallBack();
    }

    /**
     *  - 切换到游戏开始阶段
     */
    changeToStartGame(){
        this.nowStage = MainStage.STAGE_GAME_START;
        this.StateGameStartCallBack();
    }

    /**
     *  - 切换到打牌阶段
     */
    changeToDisCard(){
        this.nowStage = MainStage.STAGE_DISCARD;
        this.StateDisCardCallBack();
    }

    /**
     *  - 切换到打牌后处理阶段
     */
    changeToAfterDisCard(){
        this.nowStage = MainStage.STAGE_AFTER_DISCARD;
        this.StateAfterDisCardCallBack();
    }

    /**
     *  - 切换到抓牌阶段
     */
    changeToDrawCard(){
        this.nowStage = MainStage.STAGE_DRAWCARD;
        this.StateDrawCardCallBack();
    }

    /**
     *  - 切换到抓牌后处理阶段
     */
    changeToAfterDrawCard(){
        this.nowStage = MainStage.STAGE_AFTER_DRAWCARD;
        this.StateAfterDrawCardCallBack();
    }

    /**
     *  - 切换到游戏结算阶段
     */
    changeToFinal(){
        this.nowStage = MainStage.STAGE_FINAL_BALANCE;
        this.StateFinalBalanceCallBack();
    }

    getNowStage(){
        return this.nowStage;
    }

    /**
     *  准备状态回调
     */
    abstract StateReadyCallBack();

    /**
     *  投骰子阶段回调
     */
    abstract StateCrapCallBack();

    /**
     *  分发手牌阶段回调
     */
    abstract StateDealCallBack();

    /**
     *  处理手牌阶段回调
     */
    abstract StateHandleCallBack();

    /**
     *  游戏开始阶段回调
     */
    abstract StateGameStartCallBack();

    /**
     *  打牌阶段回调
     */
    abstract StateDisCardCallBack();

    /**
     *  打牌后处理阶段回调
     */
    abstract StateAfterDisCardCallBack();

    /**
     *  抓牌阶段回调
     */
    abstract StateDrawCardCallBack();

    /**
     *  抓牌后处理阶段回调
     */
    abstract StateAfterDrawCardCallBack();

    /**
     * 结算回调
     */
    abstract StateFinalBalanceCallBack();
}