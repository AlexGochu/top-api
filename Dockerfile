FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn
ADD . .
RUN yarn run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
