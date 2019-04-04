FROM node:10.9-slim

RUN apt-get -y update
RUN yarn global add @vue/cli -g

RUN mkdir /app
WORKDIR /app