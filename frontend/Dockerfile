FROM node:16

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start"]