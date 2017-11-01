// 消息类型
export enum MessageTypeReq {
    REQ_GAMESTART = 1000,
    REQ_DISCARD,
    REQ_RECONNECT,

};

export enum MessageTypeAck {
    ACK_READYGAME = 2000,
    ACK_DISCARD,
}

export enum MessageTypeError {
    ERROR_KICKING = 4000,// 重复登录
    ERROR_POSITION , // 当前不是你应该操作的时候
}