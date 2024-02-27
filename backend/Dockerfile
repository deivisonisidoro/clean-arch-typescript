
FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN yarn install --production

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
