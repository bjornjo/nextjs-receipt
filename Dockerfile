# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Install Chromium
RUN apk update && apk add --no-cache chromium

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application for production
RUN npm run build

# Set the environment variable to production
ENV NODE_ENV=production

# Expose port 8080 to the outside world
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
