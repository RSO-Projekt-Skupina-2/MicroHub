FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install ALL dependencies (including dev, because Vite needs them to build)
RUN npm install

# Copy everything else
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Start Node server
CMD ["npm", "start"]
