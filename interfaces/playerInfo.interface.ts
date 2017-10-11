import { Sex,Position } from '../enums/player.enum';
// 玩家基本信息接口
export interface PlayerInfoInterface {
    account : String; // 玩家账号
    name : String; // 玩家昵称
    sex : Sex; // 玩家性别
    position : Position;// 玩家座位信息
}