/*
    STAGE_READY = 0, // 准备阶段等待所有玩家准备开始游戏
    STAGE_CRAP, // 掷骰子阶段 
    STAGE_DEAL, // 分发手牌阶段
    STAGE_HANDLE_HANDCARD, // 处理手牌阶段
    STAGE_GAME_START, // 游戏开始阶段
    STAGE_DISCARD, // 打牌阶段
    STAGE_AFTER_DISCARD, // 打牌后处理阶段
    STAGE_DRAWCARD, // 抓牌阶段
    STAGE_AFTER_DRAWCARD, // 抓牌后处理阶段
    STAGE_FINAL_BALANCE // 最后结算阶段（某人和了）
*/ 

// 继承游戏状态机的对象必须实现的函数
export interface GameStateMachineInterface {
    /**
     *  准备状态回调
     */
    StateReadyCallBack ?: Function;

    /**
     *  投骰子阶段回调
     */
    StateCrapCallBack ?:Function;

    /**
     *  分发手牌阶段回调
     */
    StateDealCallBack ?:Function;

    /**
     *  处理手牌阶段回调
     */
    StateHandleCallBack:Function;

    /**
     *  游戏开始阶段回调
     */
    StateGameStartCallBack?:Function;

    /**
     *  打牌阶段回调
     */
    StateDisCardCallBack ?:Function;

    /**
     *  打牌后处理阶段回调
     */
    
    StateAfterDisCardCallBack ?:Function;

    /**
     *  抓牌阶段回调
     */
    StateDrawCardCallBack ?:Function;

    /**
     *  抓牌后处理阶段回调
     */
    StateAfterDrawCardCallBack ?:Function;

    /**
     *  抓牌后处理阶段回调
     */
    StateFinalBalanceCallBack ?:Function;// 
}