
export type Methods = "register" | "send" | "remove";

export type ChatRequestMethod = {
    "method": Methods
}

export type ChatRegisterRequest = {
    "userUUID": string,
}

export type ChatSendMessageRequest = {
    "fromUUID": string,
    "toUUID": string,
    "message": string,
}

export type ChatRemoveRequest = {
    "userUUID": string
}


export type ChatResponse = {
    "message"?: string,
    "error"?: string,
}

export type ChatRequest = ChatRequestMethod & (ChatRegisterRequest | ChatSendMessageRequest);
export type ChatRegister = ChatRequestMethod & ChatRegisterRequest;
export type ChatSend = ChatRequestMethod & ChatSendMessageRequest;
export type ChatRemove = ChatRequestMethod & ChatRemoveRequest;
