# descolar-websocket - Descolar Websocket


## Description

This is the websocket server for the Descolar project.

It provides real-time communication between the mobile app and the backend.

The websocket server is built using Node.js and fastify.


## Getting Started

Download links:
- Space
    - **SSH clone URL:**
        - ```ssh://git@git.jetbrains.space/3mty/descolar/descolar-websocket.git```
    - **HTTPS clone URL:**
        - https://git.jetbrains.space/3mty/descolar/descolar-websocket.git
- GitHub
    - **SSH clone URL:**
        - git@github.com:3mty-team/descolar-websocket.git
    - **HTTPS clone URL:**
        - https://github.com/3mty-team/descolar-websocket.git



These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


## Prerequisites

What things you need to install the software and how to install them.

1. Download and Install Node.js
    - https://nodejs.org/en/download/
2. Install Node.js Packages
    - ```npm install```
3. Build the server
    - ```npm run build```
4. Go to the dist folder ```dist``` and create a .env file with the referred content in the .env.example file
    - ```cp .env.example dist/.env```
5. Start the server
    - ```npm run start```


## Libraries & Tools

### Used Libraries

1. Fastify https://www.fastify.io/
   1. @Fastify/websocket https://github.com/fastify/fastify-websocket
   2. @Fastify/cors https://github.com/fastify/fastify-cors
   3. fastify-decorators https://github.com/L2jLiga/fastify-decorators
2. Consola https://github.com/unjs/consola
3. Typescript https://www.typescriptlang.org/
4. ts-node https://www.npmjs.com/package/ts-node
5. Babel https://babeljs.io/

### Used Tools

1. PHPStorm https://www.jetbrains.com/phpstorm/
2. Space https://www.jetbrains.com/space/
3. Websocket King client https://websocketking.com/


## Contact

This project is maintained by Descolar Team.

> If you have any questions, please contact us at: [development@descolar.fr](mailto:development@descolar.fr)