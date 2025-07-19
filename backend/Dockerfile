# Use an official Node.js runtime
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the 'backend' folder
# (This works because the Root Directory is now set to 'backend')
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of your backend application code into /app
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
# This now correctly points to /app/api/index.js
CMD [ "node", "api/index.js" ]