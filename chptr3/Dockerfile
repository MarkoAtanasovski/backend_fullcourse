# Use an official Node.js runtime
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client inside the container
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "./src/server.js"]
