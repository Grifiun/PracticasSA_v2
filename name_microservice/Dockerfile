FROM node:alpine
WORKDIR "/name"
COPY ./package.json ./
RUN npm install
COPY . . 
CMD ["npm","start"]
EXPOSE 5173