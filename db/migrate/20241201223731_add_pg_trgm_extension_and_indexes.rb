class AddPgTrgmExtensionAndIndexes < ActiveRecord::Migration[7.2]
  def change
    # Enable the pg_trgm extension
    enable_extension 'pg_trgm'

    # Remove existing indexes if they exist
    remove_index :organizations, :name if index_exists?(:organizations, :name)
    remove_index :organizations, :slug if index_exists?(:organizations, :slug)

    # Add unique B-tree indexes to enforce uniqueness
    add_index :organizations, :name, unique: true
    add_index :organizations, :slug, unique: true

    # Add GIN indexes for fuzzy search with unique names
    add_index :organizations, :name, using: :gin, opclass: :gin_trgm_ops, name: 'index_organizations_on_name_trgm'
    add_index :organizations, :slug, using: :gin, opclass: :gin_trgm_ops, name: 'index_organizations_on_slug_trgm'
  end
end
