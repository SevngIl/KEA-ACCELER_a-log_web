FROM node:lts AS build

ARG REACT_APP_CLIENT_ID
ARG REACT_APP_ALOG_API_URL
ARG REACT_APP_YORKIE_API_URL
ARG REACT_APP_YORKIE_API_KEY

ENV REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID
ENV REACT_APP_ALOG_API_URL=$REACT_APP_ALOG_API_URL
ENV REACT_APP_YORKIE_API_URL=$REACT_APP_YORKIE_API_URL
ENV REACT_APP_YORKIE_API_KEY=$REACT_APP_YORKIE_API_KEY

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]