#!/bin/bash

# Generate a 16-byte secret
SECRET=$(openssl rand -base64 16)

# Output to backend/.env
echo "DEVISE_JWT_SECRET_KEY='$SECRET'" > ./.env

# Output to frontend/.env
echo "AUTH_SECRET='$SECRET'" > ../frontend/.env


echo "Secrets generated and saved to backend/.env and frontend/.env"

cp .env.postgres.sample .env.postgres
cp backend/.env.sample backend/.env
