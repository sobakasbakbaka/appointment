FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]