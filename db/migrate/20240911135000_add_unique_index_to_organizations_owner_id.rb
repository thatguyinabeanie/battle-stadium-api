class AddUniqueIndexToOrganizationsOwnerId < ActiveRecord::Migration[7.2]
  def change
    remove_index :organizations, :owner_id if index_exists?(:organizations, :owner_id)
    add_index :organizations, :owner_id, unique: true, where: "owner_id IS NOT NULL"
  end
end
