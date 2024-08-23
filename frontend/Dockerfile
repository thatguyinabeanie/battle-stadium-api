# Use the official Node.js 14.x image as the base image
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:22 AS development

# Set the working directory inside the container
RUN mkdir -p /battle-stadium/frontend
WORKDIR /battle-stadium/frontend

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY bun.lockb ./
ENV PORT 8080
ENV BUN_INSTALL "/root/.bun"

RUN apt-get update -qq && \
    apt-get  --no-install-recommends install -y -q curl default-jdk git && \
    apt-get clean && \
    curl --proto "=https" --tlsv1.2 -sSf -L https://bun.sh/install | bash && \
    export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    bun install

ENV PATH="$BUN_INSTALL/bin:$PATH"

COPY . .

EXPOSE 8080

# Start the Next.js development server
CMD ["bun", "dev"]
