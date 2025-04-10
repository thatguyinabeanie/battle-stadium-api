#!/bin/sh

# Generate a 64-byte secret
SECRET=$(openssl rand -base64 48)

# Exit with nonzero status if no arguments are passed in
if [ $# -eq 0 ]; then
  echo "No arguments provided. Using default values..."
  postgres_user="postgres"
  postgres_password="postgres"
  postgres_db="fuecoco-db-dev"
  postgres_port="5432"
else
  postgres_user=$1
  postgres_password=$2
  postgres_db=$3
  postgres_port=$4
fi

echo "POSTGRES_USER=$postgres_user"
echo "POSTGRES_PASSWORD=$postgres_password"
echo "POSTGRES_DB=$postgres_db"
echo "POSTGRES_PORT=$postgres_port"

# POSTGRES ENV FILE SETUP
if [ -f .env.postgres ]; then
  echo ".env.postgres exists. skipping..."
else
  echo ".Creating .env.postgres ..."
  touch .env.postgres
  {
    echo "POSTGRES_USER=$postgres_user"
    echo "POSTGRES_PASSWORD=$postgres_password"
    echo "POSTGRES_DB=$postgres_db"
    echo "POSTGRES_PORT=5432"
  } > .env.postgres
  echo "done creating .env.postgres"
fi

# FRONTEND ENV FILE SETUP
if [ -f frontend/.env ]; then
  echo "frontend/.env.postgres exists. skipping..."
else
  echo "Creating frontend/.env ..."
  touch frontend/.env
  echo "AUTH_SECRET='$SECRET'" >> frontend/.env
  echo "done creating frontend/.env"
fi

# BACKEND ENV FILE SETUP
if [ -f .env ]; then
  echo ".env exists. skipping..."
else
  echo "Creating .env ..."
  touch .env
  echo "AUTH_SECRET='$SECRET'" >> .env
  echo "done creating .env"
fi


