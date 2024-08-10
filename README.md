# Battle Stadium

[![Build](https://github.com/thatguyinabeanie/battle-stadium/actions/workflows/ruby_on_rails.yml/badge.svg?branch=main)](https://github.com/thatguyinabeanie/battle-stadium/actions/workflows/ruby_on_rails.yml)

Battle Stadium is the definitive Pokemon VGC Tournament Hosting website. This project is a Ruby on Rails API with a modern React frontend, utilizing the Devise gem for authentication.

## Table of Contents

- [Overview](#overview)

- [Development](#development)
  - [Developing with Visual Studio Devcontainers](#visual-studio-devcontainers-development)
  - [Testing](#testing)
  - [Running Services](#running-services)
- [Contributing](#contributing)
- [License](#license)

## Overview

Battle Stadium is designed to facilitate the hosting and management of Pokemon VGC tournaments. It features a robust backend built with Ruby on Rails and a dynamic frontend using NextJS. Authentication is handled via the Devise gem.

## Development

### Local Development

#### Local Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/)
- [openssl@3](https://formulae.brew.sh/formula/openssl@3)
- A ruby node version manager - frum, nvm, rbenv, asdf

#### Local Setup Steps

1. Install docker

2. Install pnpm

    ```bash
    npm install -g pnpm
    ```

3. Install openssl. Windows users you're on your own

    ```bash
        brew install openssl@3
    ```

4. Set up the correct ruby version with OpenSSL. Installing and setting up a ruby version manager is entirely up to you.

    Use your favorite ruby version manager to set up the correct ruby version. Below are examples of some of
    the most popular ruby version managers

    ```bash
    frum install  --with-openssl-dir=$(brew --prefix openssl)
    RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl)" rbenv install
    RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@3)" asdf install ruby
    rvm install 3.3.4 --with-openssl-dir=$(brew --prefix openssl@3) && rvm use
    ```

### Visual Studio Devcontainers Development

#### Devcontainer Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [devcontainer cli](https://github.com/devcontainers/cli)

#### Devcontainer Setup Steps

1. Install docker

2. Install devcontainers cli using your favorite package manager

    ```bash
    npm install -g @devcontainers/cli
    pnpm install -g @devcontainers/cli
    npm install -g @devcontainers/cli
    bun add -g @devcontainers/cli
    ```

3. Clone the repository:

    ```bash
    git clone https://github.com/thatguyinabeanie/battle-stadium.git
    cd battle-stadium
    ```

4. Build the docker container images

    ```bash
    docker compose build
    ```

5. Open devcontainer instance in Visual Studio Code

    ```bash
    devcontainer open [backend|frontend]
    ```

### Testing

#### Running Tests Locally

- Rails API RSpec Tests

    ```bash
    cd backend
    rspec
    ```

- Front End NextJS Jest Test

    ```bash
    cd frontend
    pnpm test
    ```

#### Running Tests in devcontainers

#### From a VS Code devcontainer shell session

- Rails API RSpec Tests

    ```bash
    rspec
    ```

- Front End NextJS Jest Test

    ```bash
    pnpm test
    ```

#### From a local shell session

- Rails API RSpec Tests

    ```bash
    # from the root of the repo
    docker compose run -rm backend bash -c "rspec"
    ```

- Front End NextJS Jest Test

    ```bash
    # from the root of the repo
    docker compose run -rm frontend bash -c "pnpm test"
    ```

### Running Services

#### Running Services Locally

1. Rails API Server

    ```bash
    docker compose up -d db
    cd backend
    bundle exec rails server -b 0.0.0.0 -p 3000
    ```

2. NextJS Server

    ```bash
    cd frontend
    pnpm dev
    ```

#### Running Services Through Docker

1. Use the helper script

    ```bash
    # from the root of the repo
    ./start_services.sh
    ```

## Contributing

We welcome contributions! Please see our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the `Attribution-NonCommercial-ShareAlike 4.0 International Public License`. Please see [LICENSE](./LICENSE) file for details.
