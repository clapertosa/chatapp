FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
RUN npm install -g knex
COPY ./ ./
CMD [ "npm", "run", "build" ]