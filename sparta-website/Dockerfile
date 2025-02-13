# Stage 1: Build the Node.js application
FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# List the contents of the /usr/src/app/dist directory to verify the build output
RUN ls -la /usr/src/app/dist

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]