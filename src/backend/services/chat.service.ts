import {WebSocket} from "@fastify/websocket";
import ClientNotFoundException from "../Exceptions/ClientNotFoundException";
import {ChatRegister, ChatSend, ChatSendMessageRequest} from "../Types/Chat/chat.types";
import DataNotFormattedWellException from "../Exceptions/DataNotFormattedWellException";


export default class ChatService {

    private static readonly clientList: { userUUID: string, socket: WebSocket }[] = []
    private static readonly cache: { userUUID: string, messages: ChatSendMessageRequest[] }[] = []

    public registerClient(data: ChatRegister|null, socket: WebSocket) {

        if(!data) {
            throw new DataNotFormattedWellException();
        }

        const {userUUID} = data

        const client = ChatService.clientList.find((client) => client.userUUID === userUUID)

        if (client) {
            ChatService.clientList.splice(ChatService.clientList.indexOf(client), 1)
        }

        ChatService.clientList.push({userUUID: userUUID, socket: socket})

        this.useCache(userUUID)
    }

    public sendClient(data: ChatSend|null) {

        if(!data) {
            throw new DataNotFormattedWellException();
        }

        const clientFrom = ChatService.clientList.find((client) => client.userUUID === data.fromUUID)

        if (!clientFrom) {
            throw new ClientNotFoundException();
        }

        const dataToSend = {
            "toUUID": data.toUUID,
            "fromUUID": data.fromUUID,
            "message": data.message,
            "iat":  Date.now().toString(),
        }

        this.send(data.toUUID, dataToSend)
    }

    private sendComponent(socket: WebSocket, message: object) {
        socket.send(JSON.stringify(message))
    }

    public sendWithSocket(socket: WebSocket, message: object) {
        this.sendComponent(socket, message)
    }

    private sendToCache(message: ChatSendMessageRequest) {
        const cache = ChatService.cache.find((cache) => cache.userUUID === message.toUUID)

        if (!cache) {
            ChatService.cache.push({userUUID: message.toUUID, messages: [message]})
        } else {
            cache.messages.push(message)
        }
    }

    private useCache(userUUID: string) {
        const cache = ChatService.cache.find((cache) => cache.userUUID === userUUID)

        if (cache) {
            cache.messages.forEach((message) => {
                this.send(userUUID, message)
            })

            ChatService.cache.splice(ChatService.cache.indexOf(cache), 1)
        }
    }

    public send(userUUID: string, message: ChatSendMessageRequest) {

        const client = ChatService.clientList.find((client) => client.userUUID === userUUID)

        if (!client) {
            this.sendToCache(message)
        }

        client.socket.send(JSON.stringify(message));
    }

    public sendError(socket: WebSocket, message: string) {
        this.sendComponent(socket, {"error": message})
    }

}