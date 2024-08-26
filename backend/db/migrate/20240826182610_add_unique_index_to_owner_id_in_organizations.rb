class AddUniqueIndexToOwnerIdInOrganizations < ActiveRecord::Migration[7.1]
  def change
    add_index :organizations, :owner_id, unique: true
  end
end
