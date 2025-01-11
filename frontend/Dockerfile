# Use Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Start the HTTP server to serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]
