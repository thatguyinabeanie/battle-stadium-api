#!/bin/bash

echo "Generating OpenAPI YAML..."
cd backend
bundle exec rails rswag:specs:swaggerize

echo "Generating Typescript API client..."
cd ../frontend
pnpm run generate:api