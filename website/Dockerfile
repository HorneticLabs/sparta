# Build Stage
FROM node:lts-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the project (compiles TypeScript and copies views/public assets)
RUN npm run build

# Production Stage
FROM node:lts-alpine

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install

# Copy the built output (including views and public assets) from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
