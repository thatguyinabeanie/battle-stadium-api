#!/bin/bash

# Generate a 16-byte secret
SECRET=$(openssl rand -base64 16)

# Output to ./.env
echo "DEVISE_JWT_SECRET_KEY='$SECRET'" > ./.env

# Output to ../frontend/.env
echo "AUTH_SECRET='$SECRET'" > ../frontend/.env

echo "Secrets generated and saved to ./.env and ../frontend/.env"
