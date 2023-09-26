FROM node:16-alpine

WORKDIR /var/www/html/react/

COPY ./package*.json ./

RUN npm install --ignore-engines --force
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
