# Use a Node.js base image for building and serving the React app
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the port your React app runs on
EXPOSE 3000

# Copy the entire React application code
COPY . .

# Command to run the React app
CMD ["npm", "start"]
