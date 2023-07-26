FROM node:18.15-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install
RUN npm i -g nodemon

COPY ./ ./

CMD [ "npm","start" ]
