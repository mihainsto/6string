FROM node:14-alpine

COPY . ./
RUN yarn install
RUN npm install -g serve
RUN yarn run build
EXPOSE 5000
CMD ["yarn", "start-heroku"]