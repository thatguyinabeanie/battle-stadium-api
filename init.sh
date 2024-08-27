#!/bin/sh

# Generate a 16-byte secret
SECRET=$(openssl rand -base64 16)

cp .env.postgres.sample .env.postgres
cp frontend/.env.local.sample frontend/.env.local

# Output to backend/.env
touch backend/.env
echo "DEVISE_JWT_SECRET_KEY='$SECRET'" > backend/.env

# Output to frontend/.env
touch frontend/.env
echo "AUTH_SECRET='$SECRET'" > frontend/.env

echo "Secrets generated and saved to backend/.env and frontend/.env"
