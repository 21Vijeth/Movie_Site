# 1. Use an official Node.js runtime as a parent image
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# 4. Install production dependencies
RUN npm install --omit=dev

# 5. Copy the rest of your backend application code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 5000

# 7. Define the command to run your app
CMD [ "node", "api/index.js" ]