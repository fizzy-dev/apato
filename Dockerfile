FROM node:10.16.3
WORKDIR /usr/src/app
RUN npm install -g forever
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "forever", "--watch", "./bin/www" ]