# Use the official Node.js 14.x image as the base image
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:22 AS base-image

# Set the working directory inside the container
RUN mkdir -p /battle-stadium/frontend
WORKDIR /battle-stadium/frontend

# Copy package.json and package-lock.json to the working directory
ENV PORT 8080

RUN apt-get update -qq && \
    apt-get  --no-install-recommends install -y -q curl default-jdk git && \
    apt-get clean

ADD https://bun.sh/install /tmp/bun-install.sh
RUN bash /tmp/bun-install.sh && rm /tmp/bun-install.sh

ENV BUN_INSTALL "/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"
COPY package.json bun.lockb ./
RUN bun add -g drizzle-kit && \
    bun add -g pg postgres @neondatabase/serverless && \
    bun install

COPY . .

FROM base-image AS development
EXPOSE 8080
# Start the Next.js development server
CMD ["bun", "dev"]
