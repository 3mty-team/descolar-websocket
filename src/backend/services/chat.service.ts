import {WebSocket} from "@fastify/websocket";
import ClientNotFoundException from "../Exceptions/ClientNotFoundException";
import {ChatRegister, ChatSend} from "../Types/Chat/chat.types";
import ClientAlreadyExistsException from "../Exceptions/ClientAlreadyExistsException";
import DataNotFormattedWellException from "../Exceptions/DataNotFormattedWellException";


export default class ChatService {

    private static readonly clientList: { userUUID: string, socket: WebSocket }[] = []

    public registerClient(data: ChatRegister|null, socket: WebSocket) {

        if(!data) {
            throw new DataNotFormattedWellException();
        }

        const client = ChatService.clientList.find((client) => client.userUUID === data.userUUID)

        if (client) {
            throw new ClientAlreadyExistsException();
        }

        ChatService.clientList.push({userUUID: data.userUUID, socket: socket})
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
            "message": data.message
        }

        this.send(data.toUUID, dataToSend)
    }

    private sendComponent(socket: WebSocket, message: object) {
        socket.send(JSON.stringify(message))
    }

    public sendWithSocket(socket: WebSocket, message: object) {
        this.sendComponent(socket, message)
    }

    public send(userUUID: string, message: object) {

        const client = ChatService.clientList.find((client) => client.userUUID === userUUID)

        if (!client) {
            throw new ClientNotFoundException()
        }

        client.socket.send(JSON.stringify(message));
    }

    public sendError(socket: WebSocket, message: string) {
        this.sendComponent(socket, {"error": message})
    }

}