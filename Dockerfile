FROM node:19-alpine
WORKDIR /opt/app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
ADD . .
RUN yarn run build
RUN yarn install --production --ignore-scripts --prefer-offline --force --frozen-lockfile
CMD ["node", "./dist/main.js"]
