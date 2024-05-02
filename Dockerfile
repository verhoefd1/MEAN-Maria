#Specifies the image of your engine
FROM node:16.13.2

#The working directory inside your container
WORKDIR /app

# Get the package.json first to install dependencies
COPY package.json ./
# COPY package-lock.json ./

#This will install the dependencies
RUN npm install
#Used for running in automated environments.
# RUN npm ci

#Copy the rest of my code into the working directory
COPY . ./

#Not sure if this is needed
EXPOSE 8080

#Trying the Medium command - I think this is overrode by the Docker-compose.yml file
# CMD [ "node", "app.js" ]
CMD ["npm", "run", "start"]