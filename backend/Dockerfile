# Use Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy all backend files into the container
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend service
CMD ["node", "index.js"]
