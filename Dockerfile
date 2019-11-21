FROM node:10.16.3
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "nodemon", "./bin/www" ]