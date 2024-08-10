#!/bin/bash

# Check if Docker command is installed
if ! command -v docker &> /dev/null; then
  echo "Docker command is not installed. Please install Docker and try again."
  exit 1
fi

# Start the Docker Compose services
docker compose up -d db
docker compose run --rm backend sh -c "(bundle check || bundle install) && bundle exec rails server -b 0.0.0.0 -p 3000"
docker compose run --rm frontend sh -c "(pnpm install --silent -f && pnpm dev)"
