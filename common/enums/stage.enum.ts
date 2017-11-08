// 游戏涉及到的阶段的声明
export enum MainStage {
    STAGE_READY = 0, // 准备阶段等待所有玩家准备开始游戏
    STAGE_GAME_START, // 游戏开始阶段
    STAGE_CRAP, // 掷骰子阶段 
    STAGE_DEAL, // 分发手牌阶段
    STAGE_HANDLE_HANDCARD, // 处理手牌阶段
    STAGE_DISCARD, // 打牌阶段
    STAGE_AFTER_DISCARD, // 打牌后处理阶段
    STAGE_DRAWCARD, // 抓牌阶段
    STAGE_AFTER_DRAWCARD, // 抓牌后处理阶段
    STAGE_WAITING,// 等待相应阶段
    STAGE_FINAL_BALANCE // 最后结算阶段（某人和了）
}
