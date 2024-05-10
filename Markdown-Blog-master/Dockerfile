# Use Node.js LTS version as base image
FROM node:14

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the Express server runs
EXPOSE 5000

# Command to run the server
CMD ["npm", "start"]