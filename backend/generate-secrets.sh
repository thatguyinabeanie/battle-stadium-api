#!/bin/bash
# Function to generate a 32-character secret
generate_secret() {
  openssl rand -hex 16
}

# Ensure the script is run from the root of a Rails project
if [ ! -f "config/application.rb" ]; then
  echo "This script must be run from the root of a Rails project."
  exit 1
fi

rm -f config/master.key
rm -f config/credentials.yml.enc

# Generate secrets
dev_jwt_secret=$(generate_secret)
test_jwt_secret=$(generate_secret)
prod_jwt_secret=$(generate_secret)

# Generate the master key
echo "Generating master key..."
MASTER_KEY=$(generate_secret) # 16 bytes = 32 hex characters
echo $MASTER_KEY > config/master.key

# Ensure the master key is added to .gitignore
if ! grep -q "config/master.key" .gitignore; then
  echo "Adding master key to .gitignore..."
  echo "config/master.key" >> .gitignore
fi

# Remove any existing credentials file
echo "Removing existing credentials file..."
rm -f config/credentials.yml.enc

# Create the credentials file
echo "Creating credentials file..."
EDITOR="echo" rails credentials:edit

dev_jwt_secret_key=$(rails secret)

# Add some default content to the credentials file
echo "Adding default content to credentials file..."
# Create the credentials file content

cat <<EOL > tmp_credentials.yml
test:
  secret_key_base: $(generate_secret)
  devise:
    jwt_secret_key: $test_jwt_secret
development:
  secret_key_base: $(generate_secret)
  devise:
    jwt_secret_key: $dev_jwt_secret
production:
  secret_key_base: $(generate_secret)
  devise:
    jwt_secret_key: $prod_jwt_secret
EOL

# Create a temporary script to copy the content
echo "Creating temporary script for editor..."
cat <<EOS > tmp_editor.sh
#!/bin/sh
cat tmp_credentials.yml > \$1
EOS
chmod +x tmp_editor.sh

# Encrypt the credentials file
echo "Encrypting credentials file..."
EDITOR="./tmp_editor.sh" rails credentials:edit

# Clean up temporary files
rm tmp_credentials.yml tmp_editor.sh

echo "Master key and credentials file have been generated and configured."

echo "creating frontend/.env.local"
echo "AUTH_SECRET=$dev_jwt_secret" > ../frontend/.env
