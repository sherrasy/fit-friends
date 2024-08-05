FROM node:18.18-alpine
WORKDIR /opt/fit-friends-frontend
COPY ./package.json .
RUN npm install
RUN npm install -g serve
COPY ./dist ./build
CMD serve -s build
