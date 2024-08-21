# Use the official Node.js 14.x image as the base image
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:22 AS development

# Set the working directory inside the container
RUN mkdir -p /battle-stadium/frontend
WORKDIR /battle-stadium/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
ENV PORT 8080

RUN apt-get update -qq && \
    apt-get  --no-install-recommends install -y -q curl default-jdk git && \
    apt-get clean && \
    npm install  --ignore-scripts -g pnpm && \
    pnpm install

COPY . .

# Expose the default Next.js port (3000)
EXPOSE 8080

# Start the Next.js development server
CMD ["pnpm", "run", "dev"]
