import consolaGlobalInstance from "consola";
import {DescolarWebsocket} from "./backend/DescolarWebsocket";

(async () => {
    consolaGlobalInstance.info(
        `Initializing server on the ${process.env.NODE_ENV ?? "developement"} environment...`
    )

    const server = DescolarWebsocket.getInstance()
    await server.start();
})();