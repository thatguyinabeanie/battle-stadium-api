#!/bin/sh

# Generate a 16-byte secret
SECRET=$(openssl rand -base64 16)

# Exit with nonzero status if no arguments are passed in
if [ $# -eq 0 ]; then
  echo "No arguments provided. Using default values...\n"
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
echo "POSTGRES_PORT=$postgres_port\n"

# POSTGRES ENV FILE SETUP
if [ -f .env.postgres ]; then
  echo ".env.postgres exists. skipping...\n"
else
  echo ".Creating .env.postgres ..."
  touch .env.postgres
  echo "POSTGRES_USER=$postgres_user" >> .env.postgres
  echo "POSTGRES_PASSWORD=$postgres_password" >> .env.postgres
  echo "POSTGRES_DB=$postgres_db" >> .env.postgres
  echo "POSTGRES_PORT=5432" >> .env.postgres
  echo "done creating .env.postgres\n"
fi

# FRONTEND ENV FILE SETUP
if [ -f frontend/.env ]; then
  echo "frontend/.env.postgres exists. skipping...\n"
else
  echo "Creating frontend/.env ..."
  touch frontend/.env
  echo "AUTH_TWITTER_ID=" >> frontend/.env
  echo "AUTH_TWITTER_SECRET=" >> frontend/.env

  echo "AUTH_DISCORD_ID=" >> frontend/.env
  echo "AUTH_DISCORD_SECRET=" >> frontend/.env

  echo "AUTH_GITHUB_ID=" >> frontend/.env
  echo "AUTH_GITHUB_SECRET=" >> frontend/.env

  echo "AUTH_TWITCH_ID=" >> frontend/.env
  echo "AUTH_TWITCH_SECRET=" >> frontend/.env
  echo "AUTH_SECRET='$SECRET'" >> frontend/.env
  echo "done creating frontend/.env\n"
fi

# BACKEND ENV FILE SETUP
if [ -f backend/.env ]; then
  echo "backend/.env exists. skipping...\n"
else
  echo "Creating backend/.env ..."
  touch backend/.env
  echo "AUTH_SECRET='$SECRET'" >> backend/.env
  echo "done creating backend/.env"
fi


