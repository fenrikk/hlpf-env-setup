FROM node:20-alpine

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

WORKDIR /app

# Copy only dependency files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts 2>/dev/null || true

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
