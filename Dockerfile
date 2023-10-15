FROM node:18.16-alpine as build

WORKDIR /app
ENV NODE_ENV=production

COPY . .

RUN npm install -g @nestjs/cli npm@9.8.1 && \
  npm install && npm run build

FROM node:18.16-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist dist
# COPY --from=build /app/prisma prisma
COPY --from=build /app/package.json .

RUN npm install -g npm@9.8.1 && npm install --omit-dev

CMD ["npm","run", "start:prod"]