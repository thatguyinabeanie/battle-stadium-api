class UpdateOrgNameIndexes < ActiveRecord::Migration[7.2]
  def change
    remove_index :organizations, :name
    add_index :organizations, :name, unique: true, where: "name IS NOT NULL"
  end
end
