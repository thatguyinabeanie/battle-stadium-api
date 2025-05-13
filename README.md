# Battle Stadium

[![Build](https://github.com/thatguyinabeanie/battle-stadium/actions/workflows/ruby_on_rails.yml/badge.svg?branch=main)](https://github.com/thatguyinabeanie/battle-stadium/actions/workflows/ruby_on_rails.yml)

Battle Stadium is the definitive platform for hosting and managing Pokémon VGC tournaments. Built with a robust Ruby on Rails API and a modern React/Next.js frontend, it empowers organizers and players with a seamless, scalable, and feature-rich experience.

---

## 🚀 Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [bun](https://bun.sh/)
- [openssl@3](https://formulae.brew.sh/formula/openssl@3)
- A Ruby version manager (frum, rbenv, asdf, etc.)

### Local Setup
```bash
# Clone the repository
 git clone https://github.com/thatguyinabeanie/battle-stadium.git
 cd battle-stadium

# Initialize environment
 ./init.sh

# Build and start services
 docker compose build
 docker compose up -d

# Run Rails server (API)
 bundle exec rails server -b 0.0.0.0 -p 10000

# Run frontend (in ./frontend)
 bun dev
```

### Running Tests
```bash
# Rails API tests
rspec

# Frontend tests
cd frontend && bun test
```

For devcontainer setup and advanced options, see the [Development](#development) section below.

---

## 🏗️ Architecture Overview

Battle Stadium is designed as an API-first application, with a clear separation between backend and frontend. The backend is a Ruby on Rails API that manages tournaments, users, matches, and more. The frontend (not included here) is a modern React/Next.js app.

**Key Concepts:**
- **Profiles:** Flexible user identities, supporting multiple personas per account.
- **Phases:** Modular tournament stages (Swiss, Single Elimination, etc.).
- **Service Objects:** Encapsulate business logic for maintainability.
- **Authentication:** Clerk integration, secure cookies, and extensible auth utilities.
- **Testing:** Comprehensive RSpec suite, mirroring the app structure.

---

## 📚 Technical Details

Battle Stadium is organized into several key components, each with its own documentation. For in-depth technical details, see the following:

### Application Structure
- [app/README.md](app/README.md) — Main Rails application directory and subcomponents
- [app/controllers/README.md](app/controllers/README.md) — Controller layer, routing, and HTTP logic
- [app/controllers/api/v1/README.md](app/controllers/api/v1/README.md) — API v1 controller architecture and patterns
- [app/models/README.md](app/models/README.md) — Domain models and relationships
- [app/models/phases/README.md](app/models/phases/README.md) — Tournament phase system
- [app/models/profiles.md](app/models/profiles.md) — Profiles feature and identity management
- [app/services/README.md](app/services/README.md) — Service objects and business logic

### Libraries and Utilities
- [lib/README.md](lib/README.md) — Custom libraries and utilities
- [lib/auth/README.md](lib/auth/README.md) — Authentication utilities and Clerk integration
- [lib/math/README.md](lib/math/README.md) — Mathematical utilities and tiebreaker logic

### Testing
- [spec/README.md](spec/README.md) — Test suite structure and best practices

For a full list of documentation files, see [README_PATHS.txt](README_PATHS.txt).

---

## 🛠️ Development

See the [Quick Start](#quick-start) above for the fastest way to get running.

### Devcontainer Setup
- Requires [devcontainer CLI](https://github.com/devcontainers/cli)
- See [app/README.md](app/README.md) for details

### Running Services
- Rails API: `bundle exec rails server -b 0.0.0.0 -p 10000`
- Frontend: `cd frontend && bun dev`
- Database and dependencies: `docker compose up -d`

### Running Tests
- Rails: `rspec`
- Frontend: `cd frontend && bun test`

---

## 🤝 Contributing

We welcome contributions! Please see our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Open an issue or pull request with your ideas, bug reports, or improvements.

---

## 📄 License

This project is licensed under the `Attribution-NonCommercial-ShareAlike 4.0 International Public License`. See [LICENSE](./LICENSE) for details.
