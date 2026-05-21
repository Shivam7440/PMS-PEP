FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy all source files
COPY . .

# Expose port (matches PORT in .env, typically 5001)
EXPOSE 5001

# Start the Node.js app
CMD ["npm", "start"]
