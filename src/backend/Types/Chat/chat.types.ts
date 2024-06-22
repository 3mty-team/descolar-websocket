
export type Methods = "register" | "send";

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
    "iat": string,
}


export type ChatResponse = {
    "message"?: string,
    "error"?: string,
}

export type ChatRequest = ChatRequestMethod & (ChatRegisterRequest | ChatSendMessageRequest);
export type ChatRegister = ChatRequestMethod & ChatRegisterRequest;
export type ChatSend = ChatRequestMethod & ChatSendMessageRequest;
