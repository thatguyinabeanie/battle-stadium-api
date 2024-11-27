class OrganizationsNameNotNull < ActiveRecord::Migration[7.2]
  def change
    change_column_null :organizations, :name, false
    remove_index :organizations, :name
    add_index :organizations, :name, unique: true, where: "name IS NOT NULL"
  end
end
