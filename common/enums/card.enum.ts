// 麻将牌类型的枚举体
export enum CardType {
    WAN = 1,// 万
    TIAO, // 条
    BING, // 饼
    FENG, // 风
    JIAN, // 箭
    HUA // 花
};

export enum CardState {
    DROW = 1,// 抓来的牌
    DIS, // 打出的牌
    DOOR, // 开门的牌
    WALL // 牌墙的牌
}