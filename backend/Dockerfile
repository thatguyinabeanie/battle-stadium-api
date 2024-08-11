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
    build-essential \
    curl \
    git \
    libc6 \
    libreadline-dev \
    libpq-dev \
    libssl-dev \
    zlib1g-dev && \
    curl --proto "=https" --tlsv1.2 -sSf -L https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get --no-install-recommends install -y nodejs && \
    apt-get clean &&  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    asdf plugin-add ruby https://github.com/asdf-vm/asdf-ruby.git && \
    asdf install


##
## BASE IMAGE WITH MORE DEV DEPENDENCIES
##

FROM asdf-ruby AS base-image
# INSTALL DEPENDENCIES
RUN apt-get update -qq  && apt-get --no-install-recommends install -y -q  \
    default-jre \
    openssl \
    postgresq l-client \
    ruby-dev \
    watchman \
    wget && \
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
FROM base-image AS development
ENV HOST_ENVIRONMENT=container
WORKDIR /battle-stadium/backend
COPY . .
RUN bundle check || bundle install
EXPOSE 3000

CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3000"]
