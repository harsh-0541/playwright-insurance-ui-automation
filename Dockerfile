# Use official Playwright image with all browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first (better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Default command runs all tests in parallel
CMD ["npx", "playwright", "test", "--workers=4"]
