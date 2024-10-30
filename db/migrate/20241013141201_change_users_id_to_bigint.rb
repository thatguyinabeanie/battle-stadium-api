class ChangeUsersIdToBigint < ActiveRecord::Migration[7.2]
  def up
    # Remove foreign keys that reference the users table
    remove_foreign_key :chat_messages, :users
    remove_foreign_key :clerk_users, :users
    remove_foreign_key :organization_staff_members, :users
    remove_foreign_key :organizations, :users, column: :owner_id
    remove_foreign_key :players, :users
    remove_foreign_key :profiles, :users
    remove_foreign_key :matches, :users

    # Change the type of user_id columns in related tables to bigint
    remove_column :chat_messages, :user_id, :uuid
    add_column :chat_messages, :user_id, :bigint

    remove_column :clerk_users, :user_id, :uuid
    add_column :clerk_users, :user_id, :bigint

    remove_column :organization_staff_members, :user_id, :uuid
    add_column :organization_staff_members, :user_id, :bigint

    remove_column :organizations, :owner_id, :uuid
    add_column :organizations, :owner_id, :bigint

    remove_column :players, :user_id, :uuid
    add_column :players, :user_id, :bigint

    remove_column :profiles, :user_id, :uuid
    add_column :profiles, :user_id, :bigint

    remove_column :matches, :reset_by, :uuid
    add_column :matches, :reset_by_id, :bigint

    # Remove the existing UUID primary key
    remove_column :users, :id, :uuid

    # Add a new bigint primary key
    add_column :users, :id, :bigint, null: false, primary_key: true # rubocop:disable Rails/DangerousColumnNames

    # Re-add foreign keys with the new bigint primary key
    add_foreign_key :chat_messages, :users
    add_foreign_key :clerk_users, :users
    add_foreign_key :organization_staff_members, :users
    add_foreign_key :organizations, :users, column: :owner_id
    add_foreign_key :players, :users
    add_foreign_key :profiles, :users
    add_foreign_key :matches, :users, column: :reset_by_id
  end

  def down
    # Remove foreign keys that reference the users table
    remove_foreign_key :chat_messages, :users
    remove_foreign_key :clerk_users, :users
    remove_foreign_key :organization_staff_members, :users
    remove_foreign_key :organizations, :users, column: :owner_id
    remove_foreign_key :players, :users
    remove_foreign_key :profiles, :users
    remove_foreign_key :matches, :users

    # Change the type of user_id columns in related tables back to uuid
    remove_column :chat_messages, :user_id, :bigint
    add_column :chat_messages, :user_id, :uuid

    remove_column :clerk_users, :user_id, :bigint
    add_column :clerk_users, :user_id, :uuid

    remove_column :organization_staff_members, :user_id, :bigint
    add_column :organization_staff_members, :user_id, :uuid

    remove_column :organizations, :owner_id, :bigint
    add_column :organizations, :owner_id, :uuid

    remove_column :players, :user_id, :bigint
    add_column :players, :user_id, :uuid

    remove_column :profiles, :user_id, :bigint
    add_column :profiles, :user_id, :uuid

    remove_column :matches, :reset_by_id, :bigint
    add_column :matches, :reset_by, :uuid

    # Remove the existing bigint primary key
    remove_column :users, :id, :bigint

    # Add the original UUID primary key
    add_column :users, :id, :uuid, default: -> { "gen_random_uuid()" }, null: false, primary_key: true # rubocop:disable Rails/DangerousColumnNames

    # Re-add foreign keys with the original UUID primary key
    add_foreign_key :chat_messages, :users
    add_foreign_key :clerk_users, :users
    add_foreign_key :organization_staff_members, :users
    add_foreign_key :organizations, :users, column: :owner_id
    add_foreign_key :players, :users
    add_foreign_key :profiles, :users
    add_foreign_key :matches, :users, column: :reset_by
  end
end
