FROM node:18.18-alpine
LABEL authors="Descolar"

WORKDIR /code

COPY package.json ./
RUN npm install forever -g
RUN npm install

COPY . .

EXPOSE 8000

CMD ["forever", "main.js"]
