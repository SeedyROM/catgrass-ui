# build stage
FROM node:lts-alpine as build-stage

# Create app directory
WORKDIR /app

# Install all dependecies
COPY index.html ./
COPY src ./
COPY package*.json ./
COPY .env.* ./
RUN npm install
RUN npm run build

# Bundle app source
COPY . .