FROM node:latest

# create the directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# copy in the bot's dependencies
COPY package.json /usr/src/bot
RUN npm install

# copy in the bot
COPY . /usr/src/bot

# start the bot
CMD ["node", "index.js"]
