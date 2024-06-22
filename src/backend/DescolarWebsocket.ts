import Fastify, {FastifyInstance, FastifyRequest} from "fastify";
import consolaGlobalInstance from "consola"
import {WebSocket} from "@fastify/websocket";
import ChatController from "./controllers/chat.controller";

export class DescolarWebsocket {

    private static _instance: DescolarWebsocket;
    private server: FastifyInstance
    private logger: typeof consolaGlobalInstance

    private constructor() {
    }

    public static getInstance(): DescolarWebsocket {
        if (!DescolarWebsocket._instance) {
            DescolarWebsocket._instance = new DescolarWebsocket();
        }
        return DescolarWebsocket._instance;
    }

    public getServer() {
        if (!this.server) {
            this.server = Fastify({
                logger: process.env.NODE_ENV === "development"
            })
                .register(require('@fastify/websocket'))
                .register(require('@fastify/cors'), () => {
                    return (req, callback) => {
                        const corsOptions = {
                            // This is NOT recommended for production as it enables reflection exploits
                            origin: true
                        };

                        // callback expects two parameters: error and options
                        callback(null, corsOptions)
                    }
                })
                .register(async function (fastify) {
                    fastify.get("/", {websocket: true}, (socket: WebSocket, req: FastifyRequest) => {
                        new ChatController(socket, req)
                    })
                })

        }

        return this.server;
    }

    public getLogger() {
        if (!this.logger) {
            this.logger = consolaGlobalInstance.withTag("DESCOLAR");
        }
        return this.logger
    }

    public async start() {
        const port = process.env.SERVER_PORT ?? '8000';

        this.getServer()
            .listen({
                port: parseInt(port),
                host: process.env.SERVER_HOST || "127.0.0.1"
            })
            .then((address) => {
                this.getLogger().ready(`Fastify server running @ ${address}`)
            })
            .catch((err) => {
                this.getLogger().error(`Fastify server failed to start:`, err)
            })
    }
}