import {WebSocket} from "@fastify/websocket";
import {FastifyRequest} from "fastify";
import {ChatRegister, ChatRemove, ChatRequest, ChatSend} from "../Types/Chat/chat.types";
import ChatService from "../services/chat.service";
import DataNotFormattedWellException from "../Exceptions/DataNotFormattedWellException";

export default class ChatController {

    private readonly socket: WebSocket;
    private readonly req: FastifyRequest;
    private readonly service: ChatService = new ChatService();

    constructor(socket: WebSocket, req: FastifyRequest) {
        this.socket = socket;
        this.req = req;
        this.initController()
    }

    private parseMessage(msg: Buffer | ArrayBuffer | Buffer[]): ChatRequest | null {
        try {
            const message = JSON.parse(String(msg));

            if (message?.method === undefined) {
                return null
            }

            return message;

        } catch (error) {
            return null;
        }
    }

    private initController() {
        this.socket.on("message", (msg: Buffer | ArrayBuffer | Buffer[]) => this.onMessage(msg))
        this.socket.on("close", () => this.service.closeClient(this.socket))
    }

    private removeClient(msg: ChatRequest) {

        let message = msg as ChatRemove

        if (message?.userUUID === undefined) {
            message = null;
        }

        try {
            this.service.removeClient(message, this.socket);
        } catch (error) {
            if (error instanceof DataNotFormattedWellException) {
                this.service.sendError(this.socket, error.message)
                return
            }
        }
    }

    private registerMethod(msg: ChatRequest) {

        let message = msg as ChatRegister

        if (message?.userUUID === undefined) {
            message = null;
        }

        try {
            this.service.registerClient(message, this.socket);
        } catch (error) {
            if (error instanceof DataNotFormattedWellException) {
                this.service.sendError(this.socket, error.message)
                return
            }
        }
    }

    private sendMethod(msg: ChatRequest) {

        let message = msg as ChatSend

        if (message?.message === undefined || message?.fromUUID === undefined || message?.toUUID === undefined) {
            message = null;
        }

        try {
            this.service.sendClient(message);
        } catch (error) {
            if (error instanceof DataNotFormattedWellException) {
                this.service.sendError(this.socket, error.message)
                return
            }
        }
    }

    private onMessage(msg: Buffer | ArrayBuffer | Buffer[]) {

        const message = this.parseMessage(msg);

        try {
            switch (message?.method) {
                case "register":
                    this.registerMethod(message)
                    break;
                case "send":
                    this.sendMethod(message)
                    break;
                case "remove":
                    this.removeClient(this.socket)
                    break;
                default:
                    throw new DataNotFormattedWellException();
            }
        } catch (error) {
            if (error instanceof DataNotFormattedWellException) {
                this.service.sendError(this.socket, error.message)
                return
            }
        }
    }

}

