class RedoIndexesOnOrganizations < ActiveRecord::Migration[7.2]
  def change
    # Remove existing indexes
    remove_index :organizations, name: "index_organizations_on_name"
    remove_index :organizations, name: "index_organizations_on_slug"
    remove_index :organizations, name: "index_organizations_on_name_trgm"
    remove_index :organizations, name: "index_organizations_on_slug_trgm"

    # Add unique indexes with LOWER function for case-insensitive uniqueness
    add_index :organizations, "LOWER(name)", name: "index_organizations_on_lower_name", unique: true
    add_index :organizations, "LOWER(slug)", name: "index_organizations_on_lower_slug", unique: true

    # Add GIN indexes for fuzzy search
    add_index :organizations, :name, using: :gin, opclass: :gin_trgm_ops, name: "index_organizations_on_name_trgm"
    add_index :organizations, :slug, using: :gin, opclass: :gin_trgm_ops, name: "index_organizations_on_slug_trgm"
  end
end
