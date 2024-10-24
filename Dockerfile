# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a smaller image for the final stage
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

# Copy the built app from the builder stage
COPY --from=builder /usr/src/app ./

# Inform Docker that the container listens on port 3000
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production

# Run the app starts the Next.js app in production mode
CMD ["npm", "start"]

