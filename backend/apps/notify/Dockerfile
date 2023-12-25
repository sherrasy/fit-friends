FROM node:18.18-alpine
WORKDIR /opt/fit-friends-notify
COPY ./dist/apps/notify/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/notify .
CMD ["node", "./main.js"]
