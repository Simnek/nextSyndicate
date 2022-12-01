
# Install dependencies only when needed
FROM node:lts

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]