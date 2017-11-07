// 客户端请求服务器
export enum MessageTypeReq {
    REQ_LOGIN = 900,
    REQ_RECONNECT,
    REQ_GAMESTART = 1000,
    REQ_DISCARD,
    

};

// 服务器告知客户端
export enum MessageTypeAck {
    ACK_LOGIN = 900, // 登陆成功
    ACK_RECONNECT,
    ACK_READYGAME = 1000,// 准备成功
    ACK_DEALCARD,// 发牌了
    ACK_DISCARD,// 请打牌
    ACK_DOACTION,// 告知接下来可以做的操作 碰杠胡
    ACK_DRAWCARD,// 有人抓拍了
}

export enum MessageTypeError {
    ERROR_KICKING = 4000,// 重复登录
    ERROR_POSITION , // 当前不是你应该操作的时候
    ERROR_DISCARD, // 手牌中不存在打出的牌
}