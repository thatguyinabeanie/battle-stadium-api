class RenameUserToOwnerInOrganizations < ActiveRecord::Migration[7.1]
  def change
    rename_column :organizations, :user_id, :owner_id
    # add_index :organizations, :owner_id, unique: true
  end
end
