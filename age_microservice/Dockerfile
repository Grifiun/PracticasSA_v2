FROM node:alpine
WORKDIR "/age"
COPY ./package.json ./
RUN npm install
COPY . . 
CMD ["npm","start"]
EXPOSE 3000