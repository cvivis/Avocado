# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --force

# Bundle app source
COPY . .

# Expose port and start app
EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]

