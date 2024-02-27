
FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --production

COPY . .

EXPOSE 3333

CMD ["pnpm", "dev"]
