FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN npm install -g pnpm nodemon ts-node typescript

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
