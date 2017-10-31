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