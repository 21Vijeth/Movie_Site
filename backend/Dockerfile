# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the root package.json and package-lock.json
# This will now work because our build context is the project root
COPY package*.json ./

# Install ALL production dependencies defined in the root package.json
RUN npm install --omit=dev

# Now, copy only the backend's code into the container
COPY backend/ .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
# The path is correct because we copied the backend folder's contents into /app
CMD [ "node", "api/index.js" ]