FROM node:lts

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY . .

RUN npm run build

RUN npm run packages:move

RUN npm run clean

EXPOSE 3000

CMD [ "npm", "run", "start" ]