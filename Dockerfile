# pull official base image
FROM node:14.14.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./

RUN npm install -g npm@7.4.2
RUN npm install --silent
RUN yarn --silent


# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start"]