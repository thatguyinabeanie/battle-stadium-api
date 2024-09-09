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
    libpq-dev \
    libreadline-dev \
    libssl-dev \
    zlib1g-dev && \
    curl --proto "=https" --tlsv1.2 -sSf -L https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get --no-install-recommends install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    asdf plugin-add ruby https://github.com/asdf-vm/asdf-ruby.git && \
    asdf install


##
## BASE IMAGE WITH MORE DEV DEPENDENCIES
##

FROM asdf-ruby AS base-image
# INSTALL DEPENDENCIES
RUN apt-get update -qq  && \
    apt-get --no-install-recommends install -y -q  \
    default-jre \
    libc6 \
    openssl \
    postgresql \
    ruby-dev \
    watchman \
    wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

##
## DEVELOPMENT IMAGE
##
FROM thatguyinabeanie/battle-stadium:dev-latest AS development
# FROM base-image AS development
WORKDIR /battle-stadium/backend
COPY . .
RUN bundle check || bundle install
EXPOSE 10000

ENV RAILS_ENV=development
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "10000"]


##
## PRODUCTION IMAGE
##
FROM thatguyinabeanie/battle-stadium:dev-latest AS production
# FROM base-image AS production
WORKDIR /battle-stadium/backend
COPY . .
ENV PORT 10000
RUN bundle check || bundle install
EXPOSE ${PORT}
ENV RAILS_ENV=production

ENTRYPOINT [ "./bin/docker-entrypoint" ]
CMD ["./bin/docker-entrypoint"]

