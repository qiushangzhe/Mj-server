// 客户端请求服务器
export enum MessageTypeReq {
    REQ_LOGIN = 900,
    REQ_RECONNECT,
    REQ_GAMESTART = 1000,
    REQ_DISCARD,
    REQ_PENGCARD,
    REQ_ANGANG,
    REQ_MINGGANG,
    REQ_BUGANG,
    REQ_HU,
    REQ_PASS
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
    ACK_PENGCARD,// 碰
    ACK_ANGANG,// 暗杠
    ACK_MINGGANG,// 明杠
    ACK_BUGANG,// 补杠
    ACK_HU,// 和牌
}

export enum MessageTypeError {
    ERROR_KICKING = 4000,// 重复登录
    ERROR_POSITION , // 当前不是你应该操作的时候
    ERROR_DISCARD, // 手牌中不存在打出的牌
}