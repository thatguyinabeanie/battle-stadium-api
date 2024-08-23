# Use the official Node.js 14.x image as the base image
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:22 AS development

# Set the working directory inside the container
RUN mkdir -p /battle-stadium/frontend
WORKDIR /battle-stadium/frontend

# Copy package.json and package-lock.json to the working directory
ENV PORT 8080

RUN apt-get update -qq && \
    apt-get  --no-install-recommends install -y -q curl default-jdk git && \
    apt-get clean && \
    curl --proto "=https" --tlsv1.2 -sSf -L https://bun.sh/install | bash

ENV BUN_INSTALL "/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"
COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

EXPOSE 8080

# Start the Next.js development server
CMD ["bun", "dev"]
