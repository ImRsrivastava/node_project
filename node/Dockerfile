FROM node:16-alpine

WORKDIR /var/www/html/node/

COPY ./package*.json ./

RUN npm install
COPY . .


RUN npm install -g nodemon

EXPOSE 5000

CMD ["nodemon", "index.js"]

