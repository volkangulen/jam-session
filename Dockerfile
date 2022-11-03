FROM node:alpine As builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

FROM node:alpine as runtime

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --production

COPY . .

COPY --from=builder /usr/src/app/dist ./dist


CMD ["node", "dist/main"]
