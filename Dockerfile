##
## BASE IMAGE WITH ASDF AND RUBY
##
FROM mcr.microsoft.com/devcontainers/ruby:3 AS asdf-ruby
ARG ASDF_VERSION=v0.14.0
ENV PATH="/root/.asdf/bin:/root/.asdf/shims:$PATH"
WORKDIR /battle-stadium
COPY .tool-versions .
RUN git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch ${ASDF_VERSION} && \
    apt-get update -qq && \
    apt-get --no-install-recommends install -y -q \
    curl \
    git \
    build-essential \
    libssl-dev \
    libreadline-dev \
    libc6 \
    zlib1g-dev \
    libpq-dev \
    && curl --proto "=https" --tlsv1.2 -sSf -L https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get --no-install-recommends install -y nodejs \
    && apt-get clean &&  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    asdf plugin-add ruby https://github.com/asdf-vm/asdf-ruby.git && \
    asdf install


##
## BASE IMAGE WITH MORE DEV DEPENDENCIES
##

FROM asdf-ruby AS base-image
# INSTALL DEPENDENCIES
RUN apt-get update -qq  && apt-get --no-install-recommends install -y -q  \
    default-jre postgresql-client openssl wget  watchman  ruby-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Determine architecture and download the appropriate 1Password CLI
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
    curl -sS https://cache.agilebits.com/dist/1P/op/pkg/v1.12.3/op_linux_amd64_v1.12.3.zip -o op_linux_amd64_v1.12.3.zip && \
    unzip op_linux_amd64_v1.12.3.zip -d op-extract && \
    mv op-extract/op /usr/local/bin/op && \
    rm -rf op_linux_amd64_v1.12.3.zip op-extract; \
    elif [ "$ARCH" = "arm64" ]; then \
    curl -sS https://cache.agilebits.com/dist/1P/op/pkg/v1.12.3/op_linux_arm64_v1.12.3.zip -o op_linux_arm64_v1.12.3.zip && \
    unzip op_linux_arm64_v1.12.3.zip -d op-extract && \
    mv op-extract/op /usr/local/bin/op && \
    rm -rf op_linux_arm64_v1.12.3.zip op-extract; \
    else \
    echo "Unsupported architecture: $ARCH"; \
    exit 1; \
    fi

##
## DEVELOPMENT IMAGE
##
FROM thatguyinabeanie/battle-stadium:base-latest AS development
ARG BATTLE_STADIUM=battle-stadium
ARG USERNAME=vscode
WORKDIR /$BATTLE_STADIUM/
ENV DEV_ENVIRONMENT=devcontainer

COPY backend .
COPY frontend .
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY openapitools.json .
COPY turbo.json .

RUN npm install  --ignore-scripts -g pnpm --silent && \
    pnpm install --ignore-scripts --silent && \
    bundle install

EXPOSE 3000
EXPOSE 8080

WORKDIR /$BATTLE_STADIUM
CMD ["pnpm", "dev"]
