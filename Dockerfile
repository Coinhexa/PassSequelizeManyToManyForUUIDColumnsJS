FROM node:16.15.1-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install


# If you are building your code for production
# change start-dev for start

# Bundle app source
COPY . .

EXPOSE 8000
CMD ["npm", "test"]