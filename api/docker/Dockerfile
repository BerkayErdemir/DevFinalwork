FROM node:16

WORKDIR ./usr/src/



COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY . .

CMD ["npm", "start"];
