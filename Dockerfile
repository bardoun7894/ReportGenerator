# Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Install dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    fonts-noto-color-emoji \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment for build (can be overridden)
ARG OPENAI_API_KEY=""
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Build the application
RUN npm run build

# Production stage
FROM node:18-slim AS runner

WORKDIR /app

# Install Chromium and Arabic fonts for Puppeteer
# fonts-noto-core includes Noto Sans Arabic with proper text shaping
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    fonts-noto-core \
    fonts-noto-ui-core \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -fv

# Set Puppeteer environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production
ENV PORT=3000

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built standalone application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy node_modules for puppeteer (needed at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
