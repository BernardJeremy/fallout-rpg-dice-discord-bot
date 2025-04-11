FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build app from TypeScript
RUN npm run build

CMD [ "npm", "start" ]

# --- Base stage for building ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
RUN yarn build

# --- Final stage for running production server ---
FROM node:22-alpine

WORKDIR /app

# Install only production deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built app from builder
COPY --from=builder /app/dist dist

# Start the app
CMD ["yarn", "start"]