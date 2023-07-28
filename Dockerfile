#FROM node:16

#WORKDIR /app

#copy ./package*.json ./

#RUN npm install

#COPY . .

#EXPOSE 5555

#CMD ["npm","run","start"]

FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 5555
CMD ["npm","run","start"]