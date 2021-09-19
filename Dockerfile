# Base image
FROM node

# Set working directory
RUN mkdir /usr/src/app

# Copy all files from current directory to docker
COPY . /usr/src/app

WORKDIR /usr/src/app    

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install and cache app dependencies
RUN yarn

# Start app
CMD ["npm", "start"]