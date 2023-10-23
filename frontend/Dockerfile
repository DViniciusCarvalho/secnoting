FROM node:19.6.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7070
 
CMD ["npm", "run", "start", "--port", "7070"]