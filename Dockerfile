FROM node:20.7-alpine as build

WORKDIR /app

COPY . .

RUN npm install -g @nestjs/cli npm@9.8.1 && npm install && npm run build

FROM node:20.7-alpine
USER node

WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/next.config.js next.config.js
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/prisma prisma
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/.next .next

RUN npm install --omit-dev && npm cache clean --force 

CMD ["npm","run", "start:prod"]