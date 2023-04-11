# Use the official Node.js 14 Alpine image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY /package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Expose the port the application will run on
EXPOSE 3006

# Start the application
CMD ["npm", "start"]
