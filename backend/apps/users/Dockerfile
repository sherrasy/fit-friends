FROM node:18.18.0-slim
RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /opt/fit-friends-users
COPY ./dist/apps/users/package.json .
RUN npm install --omit=dev

COPY ./dist/apps/users/assets/prisma/schema.prisma ./schema.prisma

RUN npx prisma generate --schema schema.prisma
RUN cp -R  ./../../node_modules/@prisma ./node_modules && rm -r ../../node_modules


COPY ./dist/apps/users .
CMD ["node", "./main.js"]

