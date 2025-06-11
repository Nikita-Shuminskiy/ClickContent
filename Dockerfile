FROM node:20-alpine as buld
WORKDIR /app/react-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as final
COPY --from=buld /app/react-app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
