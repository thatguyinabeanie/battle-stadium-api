class AddSlugToOrganization < ActiveRecord::Migration[7.1]
  def change
    add_column :organizations, :slug, :string
    add_index :organizations, :slug, unique: true
    add_index :organizations, :name, unique: true
  end
end
