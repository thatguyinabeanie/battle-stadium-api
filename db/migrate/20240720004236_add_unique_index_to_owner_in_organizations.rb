class AddUniqueIndexToOwnerInOrganizations < ActiveRecord::Migration[7.1]
  def change
    remove_index :organizations, :owner_id
    add_index :organizations, :owner_id, unique: true
  end
end
