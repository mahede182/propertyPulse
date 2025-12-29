# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Use legacy-peer-deps to resolve React 19 vs 18 conflicts with Expo 54
RUN npm install --legacy-peer-deps

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=development
# Add node_modules/.bin to PATH
ENV PATH=/app/node_modules/.bin:$PATH

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json

# Copy source code
COPY . .

EXPOSE 8081 19000 19001 19002 19006

CMD ["npm", "run", "web"]