FROM docker.io/node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --force

COPY . .


RUN npx nx run telegram-bot:build --configuration=production 

WORKDIR /app/apps/telegram-bot


FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system telegram-bot && \
          adduser --system -G telegram-bot telegram-bot

COPY --from=builder /app/dist/apps/telegram-bot telegram-bot/
RUN chown -R telegram-bot:telegram-bot .

RUN npm --prefix telegram-bot --omit=dev -f install

USER telegram-bot

CMD [ "node", "telegram-bot" ]
