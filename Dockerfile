# Build Stage
FROM node:20 AS build

# Build Frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final Stage
FROM node:20-slim

WORKDIR /app

# Copy Backend
COPY server/package*.json ./server/
RUN cd server && npm install --production

COPY server/ ./server/
COPY --from=build /app/frontend/dist ./frontend/dist

# Environment variables
ENV NODE_ENV=production

WORKDIR /app/server
CMD ["node", "server.js"]
