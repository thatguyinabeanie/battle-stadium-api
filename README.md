# Battle Stadium

[![Build](https://github.com/thatguyinabeanie/battle-stadium/actions/workflows/ruby_on_rails.yml/badge.svg?branch=main)](https://github.com/thatguyinabeanie/battle-stadium/actions/workflows/ruby_on_rails.yml)

Battle Stadium is the definitive Pokemon VGC Tournament Hosting website. This project is a Ruby on Rails API with a modern React frontend, utilizing the Devise gem for authentication.

## Table of Contents

- [Quick Overview](#quick-overview)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Developing Locally](#developing-locally)
- [Developing in a Docker Container/Devcontainers](#developing-in-a-docker-container-devcontainers)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Quick Overview

Battle Stadium is designed to facilitate the hosting and management of Pokemon VGC tournaments. It features a robust backend built with Ruby on Rails and a dynamic frontend using React. Authentication is handled via the Devise gem.

## Dependencies

To get started with Battle Stadium, ensure you have the following dependencies installed:

- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-docker/)
- [Turbo](https://turbo.build/repo/docs/install)

## Setup

### Requirements

- Ruby 3.3.4 - Install directly or with your favorite flavor of ruby version management tool, rvm, asdf, frum, rbenv, etc...
- Node v20 - Install directly or with your favorite flavor of node version management tools, nvm, asdf, fnm, etc...
- Docker

### Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/thatguyinabeanie/battle-stadium.git
    cd battle-stadium
    ```

2. Install Ruby:

    Use your favorite version management tool, for example [`frum`](https://github.com/TaKO8Ki/frum), a fast Ruby version manager built in Rust.

    ```bash
    frum install
    asdf ruby install
    rvm install
    rbenv install
    ```

3. Install Node:

    Use your favorite version management tool, for example [`fnm`](https://github.com/Schniz/fnm), a fast and simple Node.js version manager, built in Rust.

    ```bash
    fnm install
    asdf node install
    nvm install
    ```

4. Install pnpm:

    Npm is bloated and slow, Yarn is okay, but pnpm is both fast and disk space efficient.

    ```bash
    npm install -g pnpm
    ```

5. Install Dependencies:

    ```bash
    pnpm install          # Install node dependencies for Next.js server in frontend directory
    pnpm bundle:install   # Install ruby gems for Rails API server in backend directory
    ```

6. Setup Docker:

    ```bash
    docker-compose up -d db # starts postgres db
    ```

7. Start the Rails API and NextJS Server:

    ```bash
    pnpm dev                # Uses turborepo to start both the Rails and Next.js servers
    ```

## Developing in a Docker Container/Devcontainers

### Requirements

- Docker
- VSCode with the Devcontainers Extension

### Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/thatguyinabeanie/battle-stadium.git
    cd battle-stadium
    ```

2. Build and Start Docker Container:

    ```bash
    docker compose up -d  # starts Rails and Next.js servers, and postgres db
    devcontainer open .   # opens VSCode attached to the devcontainer with Rails and Next.js servers
    ```

## Testing

### Rails API RSpec Tests

1. Backend Rails RSpec Tests:

    ```bash
    cd backend
    rspec
    ```

2. Front End NextJS Jest Test:

    ```bash
    cd frontend
    pnpm test
    ```

3. Run backend and frontend tests at the same time:

    ```bash
    pnpm test
    ```

## Contributing

We welcome contributions! Please see our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the `Attribution-NonCommercial-ShareAlike 4.0 International Public License`. Please see [LICENSE](./LICENSE) file for details.
